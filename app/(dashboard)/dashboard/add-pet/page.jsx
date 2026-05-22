"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { UploadButton } from "@uploadthing/react";
import { PawPrint, Upload, Save, ArrowLeft, ImageIcon, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import LoadingSpinner from "@/components/loading-spinner";
import { toast } from "sonner";

export default function AddPetPage() {
    const router = useRouter();
    const { user } = useUser();
    const [isSubmitting, setIsSubmitting] = useState();
    const [petData, setPetData] = useState({
        name: "",
        type: "",
        breed: "",
        age: "",
        size: "",
        gender: "",
        description: "",
        images: [],
        activityLevel: "",
        goodWithKids: false,
        goodWithPets: false,
        isHouseTrained: false,
        medicalInfo: "",
        adoptionFee: "",
        location: "",
    });

    const currentUser = useQuery(
        api.users.getUserByClerkId, 
        user?.id ? { clerkId: user.id} : "skip",
    );

    const createPet = useMutation(api.pets.createPet);

    const handleInputChange = (field, value) => {
        setPetData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleCheckboxChange = (field, checked) => {
        setPetData((prev) => ({
            ...prev,
            [field]: checked,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!currentUser) {
            toast.error("Користувача не знайдено");
            return;
        }

        // Validate the required fields
        const requiredFields = [
            "name",
            "type",
            "breed",
            "age",
            "size",
            "gender",
            "description",
            "activityLevel",
            "location",
        ];

        const missingFields = requiredFields.filter((field) => !petData[field]);

        if (missingFields.length > 0 ) {
            toast.error("Заповніть усі обов'язкові поля");
            return;
        }

        if (petData.images.length === 0) {
            toast.error("Завантажте хоча б одне фото");
            return;
        }

        setIsSubmitting(true);

        try {
            await createPet({
                ownerId: currentUser._id,
                name: petData.name,
                type: petData.type,
                breed: petData.breed,
                age: parseInt(petData.age),
                size: petData.size,
                gender: petData.gender,
                description: petData.description,
                images: petData.images,
                activityLevel: petData.activityLevel,
                goodWithKids: petData.goodWithKids,
                goodWithPets: petData.goodWithPets,
                isHouseTrained: petData.isHouseTrained,
                medicalInfo: petData.medicalInfo,
                adoptionFee: petData.adoptionFee ? parseFloat(petData.adoptionFee) : undefined,
                location: petData.location,
            });

            toast.success("Тварину успішно додано");
            router.push("/dashboard/profile");
        } catch (error) {
            console.error("Не вдалося додати тварину", error);
            toast.error("Не вдалося додати тварину. Повторіть спробу");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!currentUser) return <LoadingSpinner/>

    return <div className="mx-auto max-w-4xl p-6">
        {/* Header */}
        <div className="mb-8">
            <Link href="/dashboard/profile">
                <Button variant="ghost" className="mb-4">
                    <ArrowLeft className="mr-2 size-4"/>
                    Назад до профілю
                </Button>
            </Link>

            <div className="text-center">
                <PawPrint className="mx-auto mb-4 size-12 text-orange-500"/>
                <h1 className="md-2 text-3xl font-bold text-gray-900">Додайте тварину</h1>
                <p>
                    Допоможіть тваринці знайти свій дім
                </p>
            </div>
        </div>

        {/* Form */}
        <Card>
            <CardHeader>
                <CardTitle>
                    Інформація про тварину
                </CardTitle>
                <CardDescription>Надайте детальну інформацію про тварину, щоб допомогти потенційним власникам</CardDescription>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/*Basic information*/}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <Label htmlFor="name">Ім'я тварини *</Label>
                            <Input
                                id="name"
                                value={petData.name}
                                onChange={(e) => handleInputChange("name", e.target.value)}
                                placeholder="Введіть ім'я тварини"                          
                            />
                        </div>

                        <div>
                            <Label htmlFor="type">Тип тварини  *</Label>
                            <Select value={petData.type} onValueChange={(value) => handleInputChange("type", value)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Оберіть тип тварини"/>
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="dog">Собака</SelectItem>
                                    <SelectItem value="cat">Кіт</SelectItem>
                                    <SelectItem value="bird">Птах</SelectItem>
                                    <SelectItem value="rodent">Гризун</SelectItem>
                                    <SelectItem value="other">Інше</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div>
                            <Label htmlFor="breed">Порода *</Label>
                            <Input 
                                id="breed" 
                                value={petData.breed} 
                                onChange={(e) => handleInputChange("breed", e.target.value)} 
                                placeholder="Введіть породу"
                            />
                        </div>

                        <div>
                            <Label htmlFor="age">Вік *</Label>
                            <Input 
                                id="age" 
                                type="number"
                                min="0"
                                max="30"
                                value={petData.age} 
                                onChange={(e) => handleInputChange("age", e.target.value)} 
                                placeholder="Введіть вік у роках"
                            />
                        </div>

                        <div>
                            <Label htmlFor="gender">Стать *</Label>
                            <Select value={petData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Виберіть стать" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="male">Самець</SelectItem>
                                    <SelectItem value="female">Самка</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <Label htmlFor="size">Розмір *</Label>
                            <Select value={petData.size} onValueChange={(value) => handleInputChange("size", value)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Виберіть розмір" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="small">Малий</SelectItem>
                                    <SelectItem value="medium">Середній</SelectItem>
                                    <SelectItem value="large">Великий</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label htmlFor="activityLevel">Рівень активності *</Label>
                            <Select value={petData.activityLevel} onValueChange={(value) => handleInputChange("activityLevel", value)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Виберіть рівень активності" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="low">Низький</SelectItem>
                                    <SelectItem value="medium">Середній</SelectItem>
                                    <SelectItem value="high">Високий</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Location */}
                    <div>
                        <Label htmlFor="location">Місцезнаходження *</Label>
                        <Input 
                            id="location" 
                            value={petData.location} 
                            onChange={(e) => handleInputChange("location", e.target.value)} 
                            placeholder="Введіть адресу"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <Label htmlFor="description">Опис *</Label>
                        <Textarea 
                            id="description" 
                            value={petData.description} 
                            onChange={(e) => handleInputChange("description", e.target.value)} 
                            placeholder="Опишіть характер тварини, її звички та особливі потреби..."
                            rows={4}
                        />
                    </div>

                    {/* Images */}
                    <div>
                        <Label>Фото тварини *</Label>
                        <div className="mt-2">
                            <UploadButton endpoint="petImages" 
                                content={{
                                    button({ ready }) {
                                        if (ready) return "Завантажити";
                                        return "Підготовка...";
                                    },
                                    allowedContent() {
                                        return "Фото до 16 МБ, максимум 20";
                                    },
                                }}
                                onClientUploadComplete={(res) => {
                                    const urls = res.map((file) => file.ufsUrl);
                                    setPetData((prev) => ({
                                        ...prev,
                                        images: [...prev.images, ...urls]
                                    }));
                                    toast.success("Зображення успішно завантажено")
                                }}
                                onUploadError={(error) => {
                                    toast.error("Не вдалося завантажити фото:", { description: error.message });
                                }}
                            />

                            {petData.images.length > 0 && (
                                <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                                    {petData.images.map((url, index) => (
                                        <div key={index} className="relative">
                                            <Image 
                                                src={url} 
                                                alt={`Фото тварини ${index + 1}`}
                                                width={200} 
                                                height={200} 
                                                className="rounded-lg object-cover w-64 h-40"
                                            />
                                            <Button 
                                                type="button"  
                                                variant="destructive" 
                                                size="sm" 
                                                className="absolute top-2 right-2" 
                                                onClick={() => {
                                                    setPetData((prev) => ({
                                                        ...prev,
                                                        images: prev.images.filter((_, i) => i !== index)
                                                    }))
                                                }}>
                                                    <X className="size-5"/>
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Characteristics */}
                    <div>
                        <Label className="text-base font-maedium">Особливості</Label>
                        <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-3">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="goodWithKids"
                                    checked={petData.goodWithKids}
                                    onCheckedChange={(checked) => 
                                        handleCheckboxChange("goodWithKids", checked)
                                    }
                                />
                                <Label htmlFor="goodWithKids">Ладить з дітьми</Label>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="goodWithPets"
                                    checked={petData.goodWithPets}
                                    onCheckedChange={(checked) => 
                                        handleCheckboxChange("goodWithPets", checked)
                                    }
                                />
                                <Label htmlFor="goodWithPets">Ладить з іншими тваринами</Label>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="isHouseTrained"
                                    checked={petData.isHouseTrained}
                                    onCheckedChange={(checked) => 
                                        handleCheckboxChange("isHouseTrained", checked)
                                    }
                                />
                                <Label htmlFor="isHouseTrained">Привчено до туалету</Label>
                            </div>

                        </div>
                    </div>

                    {/* Optional information */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <Label htmlFor="adoptionFee">Плата за прилаштування (опційно)</Label>
                            <Input
                                id="adoptionFee"
                                type="number"
                                min="0"
                                step="0.01"
                                value={petData.adoptionFee}
                                onChange={(e) => 
                                    handleInputChange("adoptionFee", e.target.value)
                                }
                                placeholder="Введіть суму плати"
                                className="w-full"
                            />
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="medicalInfo">Інформація про стан здоров’я (опційно)</Label>
                        <Textarea
                            id="medicalInfo"
                            value={petData.medicalInfo}
                            onChange={(e) => 
                                handleInputChange("medicalInfo", e.target.value)
                            }
                            placeholder="Вкажіть захворювання, вакцинації або особливі потреби у догляді"
                            rows={3}
                        />
                    </div>

                    {/* Submit button */}
                    <div className="flex justify-end space-x-4">
                        <Link href="/dashboard/profile">
                            <Button variant="outline">Скасувати</Button>
                        </Link>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? <>
                                <div className="mr-2 size-4 animate-spin rounded-full border-b-2 border-white"></div>
                                Додавання тварини...
                            </> : <>
                                <Save className="mr-2 size-4"/>
                                Додати тварину
                            </>}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    </div>;
}