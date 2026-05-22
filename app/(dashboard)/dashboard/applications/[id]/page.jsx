"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { toast } from "sonner";
import {
  PawPrint,
  ArrowLeft,
  Check,
  X,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  MessageCircle,
} from "lucide-react";
import LoadingSpinner from "@/components/loading-spinner";
import { getAgeLabel, getPetTypeLabel } from "@/lib/pet-labels";
import {
  getExperienceLabel,
  getLivingSpaceLabel,
  getWorkScheduleLabel,
  getOtherPetsLabel,
} from "@/lib/application-labels";

export default function ApplicationDetailsPage() {
    const { id } = useParams();
    const router = useRouter();
    const { user } = useUser();
    const [isUpdating, setIsUpdating] = useState(false);

    const currentUser = useQuery(api.users.getUserByClerkId, user?.id ? { clerkId: user.id } : "skip");
    const application = useQuery(api.applications.getApplicationById, { id: id });
    const pet = useQuery(api.pets.getPetById, application?.petId ? { id: application.petId } : "skip");
    const applicant = useQuery(api.users.getUserById, application?.applicantId ? { id: application.applicantId } : "skip");

    const updateApplicationStatus = useMutation(api.applications.updateApplicationStatus);
    const createNotification = useMutation(api.notifications.createNotification);


    const statusTexts = {
        accepted: {
            title: "Заявку схвалено",
            message: pet ? `Статус заявки для тваринки «${pet.name}»: схвалено` : "Заявку схвалено",
            toast: "Заявку успішно схвалено",
        },
        rejected: {
            title: "Заявку відхилено",
            message: pet ? `Статус заявки для тваринки «${pet.name}»: відхилено` : "Заявку відхилено",
            toast: "Заявку успішно відхилено",
        },
    };

    const handleStatusUpdate = async (status) => {
        if (!application || !applicant || !pet || !currentUser) return;

        const statusText = statusTexts[status] || {
            title: "Заявку оновлено",
            message: `Статус заявки для тваринки «${pet.name}» оновлено`,
            toast: "Заявку успішно оновлено",
        };

        setIsUpdating(true);
        try {
            await updateApplicationStatus({
                id: application._id,
                status,
            });

            // Create notification 
            await createNotification({
                userId: application.applicantId,
                type: "application_update",
                title: statusText.title,
                message: statusText.message,
            });

            toast.success(statusText.toast);
        } catch (error) {
            console.error("Не вдалося оновити заявку", error);
            toast.error("Не вдалося оновити заявку. Повторіть спробу");
        } finally {
            setIsUpdating(false);
        }
    };

    if (!application || !pet || !applicant || !currentUser ) {
        return <LoadingSpinner />;
    }

    const isOwner = application.ownerId === currentUser._id;

    const getStatusLabel = (status) => {
        const labels = {
            pending: "На розгляді",
            accepted: "Схвалено",
            rejected: "Відхилено",
        };

        return labels[status] || status;
    };

    return (
        <div className="mx-auto max-w-6xl p-6">
            <div className="mb-8">
                <Button variant="ghost" onClick={() => router.back()} className="mb-4">
                    <ArrowLeft className="mr-2 size-4" />
                    Назад
                </Button>

                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="mb-2 text-3xl font-bold text-gray-900">
                            Заявка на прилаштування
                        </h1>
                    </div>

                    <Badge
                        className={
                            application.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : application.status === "accepted"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                        }
                    >
                        {getStatusLabel(application.status)}
                    </Badge>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="space-y-6 lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Інформація про тварину
                            </CardTitle>
                        </CardHeader>

                        <CardHeader>
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
                        </CardHeader>
                    </Card>

                    {/* Application data */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Деталі заявки</CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            <div>
                                <h4 className="mb-2 font-medium text-gray-900">
                                    Досвід із тваринами
                                </h4>
                                <p className="text-gray-700">
                                    {getExperienceLabel(application.applicationData.experience)}
                                </p>
                            </div>

                            <Separator />

                            <div>
                                <h4 className="mb-2 font-medium text-gray-900">
                                    Житловий простір
                                </h4>
                                <p className="text-gray-700">
                                    {getLivingSpaceLabel(application.applicationData.livingSpace)}
                                </p>
                            </div>

                            <Separator />

                            <div>
                                <h4 className="mb-2 font-medium text-gray-900">
                                    Графік роботи
                                </h4>
                                <p className="text-gray-700">
                                    {getWorkScheduleLabel(application.applicationData.workSchedule)}
                                </p>
                            </div>

                            <Separator />

                            <div>
                                <h4 className="mb-2 font-medium text-gray-900">
                                    Інші тварини
                                </h4>
                                <p className="text-gray-700">
                                    {getOtherPetsLabel(application.applicationData.otherPets)}
                                </p>
                            </div>

                            <Separator />

                            <div>
                                <h4 className="mb-2 font-medium text-gray-900">
                                    Чому користувач хоче прихистити тваринку
                                </h4>
                                <p className="text-gray-700">
                                    {application.applicationData.reason}
                                </p>
                            </div>

                            {application.applicationData.references && (
                                <>
                                    <Separator />

                                    <div>
                                        <h4 className="mb-2 font-medium text-gray-900">
                                            Контакти для рекомендацій
                                        </h4>
                                        <p className="text-gray-700">
                                            {application.applicationData.references}
                                        </p>
                                    </div>
                                </>
                            )}

                            {application.applicationData.additionalInfo && (
                                <>
                                    <Separator />

                                    <div>
                                        <h4 className="mb-2 font-medium text-gray-900">
                                            Додаткова інформація
                                        </h4>
                                        <p className="text-gray-700">
                                            {application.applicationData.additionalInfo}
                                        </p>
                                    </div>
                                </>
                            )}
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Інформація про заявника</CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <Avatar className="size-12">
                                    <AvatarImage
                                        src={applicant.profileImage}
                                        className="object-cover" 
                                    />
                                    <AvatarFallback>
                                        <User className="size-6" />
                                    </AvatarFallback>
                                </Avatar>

                                <div>
                                    <p className="font-medium">
                                        {applicant.name}
                                    </p>
                                    <p className="text-sm">
                                        {applicant.location}
                                    </p>
                                </div>
                            </div>

                            {applicant.bio && (
                                <p className="text-sm text-gray-700">
                                    {applicant.bio}
                                </p>
                            )}

                            <div className="space-y-2 text-gray-600">
                                <div className="flex items-center space-x-2 text-sm">
                                    <Mail className="size-4" />
                                    <span>{applicant.email}</span>
                                </div>

                                {applicant.phone && (
                                    <div className="flex items-center space-x-2 text-sm">
                                        <Phone className="size-4" />
                                        <span>{applicant.phone}</span>
                                    </div>
                                )}

                                {applicant.location && (
                                    <div className="flex items-center space-x-2 text-sm">
                                        <MapPin className="size-4" />
                                        <span>{applicant.location}</span>
                                    </div>
                                )}
                            </div>

                            <Link href={`/dashboard/users/${applicant._id}`}>
                                <Button variant="outline" className="w-full">
                                    Переглянути профіль
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Статус заявки</CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <Calendar className="size-4 text-gray-500" />
                                <span className="text-sm text-gray-600">
                                    Подано{" "}
                                    {new Date(application.createdAt).toLocaleDateString()}
                                </span>
                            </div>

                            {isOwner && application.status === "pending" && (
                                <div className="space-y-3">
                                    <Button
                                        onClick={() => handleStatusUpdate("accepted")}
                                        disabled={isUpdating}
                                        className="w-full bg-green-500 hover:bg-green-600"
                                    >
                                        <Check className="mr-2 size-4" />
                                            Схвалити заявку
                                    </Button>

                                    <Button
                                        variant="destructive"
                                        onClick={() => handleStatusUpdate("rejected")}
                                        disabled={isUpdating}
                                        className="w-full"
                                    >
                                        <X className="mr-2 size-4" />
                                            Відхилити заявку
                                    </Button>
                                </div>
                            )}

                            {application.status === "accepted" && (
                                <Link href={`/dashboard/messages?application=${application._id}`}>
                                    <Button className="w-full">
                                        <MessageCircle className="mr-2 size-4" />
                                        Відкрити чат
                                    </Button>
                                </Link>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}