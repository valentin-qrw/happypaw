"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, PawPrint, Send } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import LoadingSpinner from "@/components/loading-spinner";
import {
  getPetTypeLabel,
  getPetSizeLabel,
  getAgeLabel,
  getPetGenderLabel,
  getActivityLevelLabel
} from "@/lib/pet-labels";

export default function AdoptPage() {
    const { id } = useParams();
    const router = useRouter();
    const { user } = useUser();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        experience: "",
        livingSpace: "",
        workSchedule: "",
        otherPets: "",
        reason: "",
        references: "",
        additionalInfo: "",
    });

    const currentUser = useQuery(api.users.getUserByClerkId, user?.id ? { clerkId: user.id } : "skip");
    const pet = useQuery(api.pets.getPetById, { id: id });
    const owner = useQuery(api.users.getUserById, pet?.ownerId ? { id: pet.ownerId } : "skip");

    const createApplication = useMutation(api.applications.createApplication);
    const createNotification = useMutation(api.notifications.createNotification);

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!currentUser || !pet || !owner) {
            toast.error("Відсутня обов’язкова інформація");
            return;
        }

        //Value required fields
        const requiredFields = [
            "experience",
            "livingSpace",
            "workSchedule",
            "otherPets",
            "reason",
        ];

        const missingFields = requiredFields.filter((field) => !formData[field].trim());

        if (missingFields.length > 0) {
            toast.error("Заповніть усі обов’язкові поля");
            return;
        }

        setIsSubmitting(true);

        try {
            // Create application
            const applicationId = await createApplication({
                petId: pet._id,
                applicantId: currentUser._id,
                ownerId: pet.ownerId,
                applicationData: formData,
            });

            // Create notification for the owner
            await createNotification({
                userId: pet.ownerId,
                type: "adoption_request",
                title: "Нова заявка",
                message: `${currentUser.name} подав(ла) заявку на прихисток для ${pet.name}`,
                relatedId: applicationId,
            });

            toast.success("Заявку успішно надіслано");
            router.push(`/dashboard/pets/${pet._id}`)

        } catch (error) {
            console.error("Помилка під час подання заявки" , error);
            toast.error("Не вдалося подати заявку. Повторіть спробу");
        } finally {
            setIsSubmitting(false);
        }
    }

    if (!pet || !currentUser) {
        return <LoadingSpinner />
    }

    return (
        <div className="mx-auto max-w-4xl p-6">
            {/* Header */}
            <div className="mb-8">
                <Link href={`/dashboard/pets/${pet._id}`}>
                    <Button variant="ghost" className="mb-4">
                        <ArrowLeft className="mr-2 size-4" />
                        Назад
                    </Button>
                </Link>

                <div className="text-center">
                    <PawPrint className="mx-auto mb-4 size-12 text-orange-500" />
                    <h1 className="mb-2 text-3xl font-bold text-gray-900">
                        Прихистити
                    </h1>
                    <p>Заповніть цю заявку, щоб розпочати процес прилаштування</p>
                </div>
            </div>

            {/* Pet summary */}
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>
                        Інформація про тварину
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <div className="flex items-center space-x-4">
                        <div className="flex size-16 items-center justify-center rounded-lg bg-gray-100">
                            <PawPrint className="size-8 text-gray-400" />
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold">{pet.name}</h3>
                            <p>
                                {pet.breed} &middot; {getPetTypeLabel(pet.type)}
                            </p>
                            <p className="text-sm text-gray-500">
                                {pet.age} {getAgeLabel(pet.age)} &middot; {pet.location}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Application form */}
            <Card>
                <CardHeader>
                    <CardTitle>Заявка на прилаштування</CardTitle>
                    <CardDescription>
                        Розкажіть більше про себе, щоб ми могли переконатися, що {pet.name} знайде найкращий дім
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <Label htmlFor="experince">Ваш досвід із тваринами *</Label>
                            <Select value={formData.experience} onValueChange={(value) => handleInputChange("experience", value)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Оберіть рівень досвіду" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="first-time">Немає досвіду</SelectItem>
                                    <SelectItem value="some">Маю деякий досвід</SelectItem>
                                    <SelectItem value="experienced">Маю багатий досвід</SelectItem>
                                    <SelectItem value="professional">Професіонал (ветеринар, кінолог, т.д.)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label htmlFor="livingSpace">Ваш житловий простір *</Label>
                            <Select value={formData.livingSpace} onValueChange={(value) => handleInputChange("livingSpace", value)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Оберіть ваш житловий простір" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="apartment">Квартира</SelectItem>
                                    <SelectItem value="house-no-yard">Будинок без подвір'я</SelectItem>
                                    <SelectItem value="house-small-yard">Будинок з невеликим подвір'ям</SelectItem>
                                    <SelectItem value="house-large-yard">Будинок з великим подвір'ям</SelectItem>
                                    <SelectItem value="other">Інше</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label htmlFor="workSchedule">Графік роботи *</Label>
                            <Select value={formData.workSchedule} onValueChange={(value) => handleInputChange("workSchedule", value)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Оберіть ваш графік роботи" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="work-from-home">Працюю з дому</SelectItem>
                                    <SelectItem value="part-time">Неповний робочий день (до 6 годин)</SelectItem>
                                    <SelectItem value="full-time">Повний робочий день (6-8 годин)</SelectItem>
                                    <SelectItem value="long-hours">Довгий робочий день (понад 8 годин)</SelectItem>
                                    <SelectItem value="retired">Не працюю / на пенсії</SelectItem>
                                    <SelectItem value="student">Студент</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label htmlFor="otherPets">Чи є у вас інші тварини? *</Label>
                            <Select value={formData.otherPets} onValueChange={(value) => handleInputChange("otherPets", value)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Чи є у вас інші тварини?" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="none">Немає інших тварин</SelectItem>
                                    <SelectItem value="dogs">Є собаки</SelectItem>
                                    <SelectItem value="cats">Є коти</SelectItem>
                                    <SelectItem value="both">Є коти і собаки</SelectItem>
                                    <SelectItem value="other">Є інші тварини</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label htmlFor="reason">Чому ви хочете прихистити цю тваринку?</Label>
                            <Textarea 
                                id="reason" 
                                placeholder="Розкажіть, чому ця тваринка вам сподобалась і чому ви хочете її прихистити" 
                                value={formData.reason} 
                                onChange={(e) => handleInputChange("reason", e.target.value)} 
                                rows={4} 
                            />
                        </div>

                        <div>
                            <Label htmlFor="references">Контакти для рекомендацій (опційно)</Label>
                            <Textarea 
                                id="references" 
                                placeholder="Вкажіть контакти людей, які можуть вас порекомендувати" 
                                value={formData.references} 
                                onChange={(e) => handleInputChange("references", e.target.value)} 
                                rows={3} 
                            />
                        </div>

                        <div>
                            <Label htmlFor="additionalInfo">Додаткова інформація (опційно)</Label>
                            <Textarea 
                                id="additionalInfo" 
                                placeholder="Напишіть, якщо хочете щось додати" 
                                value={formData.additionalInfo} 
                                onChange={(e) => handleInputChange("additionalInfo", e.target.value)} 
                                rows={3} 
                            />
                        </div>

                        <div className="flex justify-end space-x-4">
                            <Link href={`/dashboard/pets/${pet._id}`}>
                                <Button variant="outline">Скасувати</Button>
                            </Link>

                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <>
                                        <div className="mr-2 size-4 animate-spin rounded-full border-b-2 border-white"></div>
                                        Подання заявки...
                                    </>
                                ) : (
                                    <>
                                        <Send className="mr-2 size-4" />
                                        Подати заявку
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}