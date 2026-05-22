"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { useUser, useClerk } from "@clerk/nextjs";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";
import { Settings, User, Bell, Save, Trash2, AlertTriangle, PawPrint } from "lucide-react";
import { toast } from "sonner";
import LoadingSpinner from "@/components/loading-spinner";

export default function SettingsPage() {
    const { user } = useUser();
    const { signOut } = useClerk();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [profileData, setProfileData] = useState({
        name: "",
        bio: "",
        location: "",
        phone: "",
    });
    const [preferences, setPreferences] = useState({
        petType: [],
        size: [],
        age: [],
        activityLevel: "",
        livingSpace: "",
        experience: "",
    });

    const currentUser = useQuery(api.users.getUserByClerkId, user?.id ? { clerkId: user.id } : "skip");
    const updateUser = useMutation(api.users.updateUser);
    const deleteUser = useMutation(api.users.deleteUser);

    useEffect(() => {
        if (currentUser) {
            setProfileData({
                name: currentUser.name || "",
                bio: currentUser.bio || "",
                location: currentUser.location || "",
                phone: currentUser.phone || "",
            })

            if (currentUser.preferences) {
                setPreferences({
                    petType: currentUser.preferences.petType || [],
                    size: currentUser.preferences.size || [],
                    age: currentUser.preferences.age || [],
                    activityLevel: currentUser.preferences.activityLevel || "",
                    livingSpace: currentUser.preferences.livingSpace || "",
                    experience: currentUser.preferences.experience || "",
                })
            }
        }
    }, [currentUser]);

    const handleProfileChange = (field, value) => {
        setProfileData((prev) => ({ ...prev, [field]: value }));
    }

    const handlePreferenceChange = (field, value) => {
        setPreferences((prev) => ({ ...prev, [field]: value }));
    }

    const handleArrayPreferenceChange = (field, value, checked) => {
        setPreferences((prev) => ({...prev, [field]: checked ? [...prev[field], value] : prev[field].filter((item) => item !== value) }));
    }

    const handleSave = async () => {
        if (!currentUser) return;

        setIsLoading(true);
        try {
            await updateUser({
                id: currentUser._id,
                ...profileData,
                preferences,
            });
            toast.success("Налаштування успішно збережено");
        } catch (error) {
            console.error("Помилка при збереженні налаштувань:", error);
            toast.error("Не вдалося зберегти налаштування. Спробуйте ще раз.");
        } finally {
            setIsLoading(false);
        }

    }

    const handleDeleteAccount = async () => {
        if (!currentUser) return;

        setIsDeleting(true);
        try {
            await deleteUser({ id: currentUser._id });
            toast.success("Акаунт успішно видалено");
            await signOut();
            router.push("/auth/sign-in");
        } catch (error) {
            console.error("Помилка при видаленні акаунта:", error);
            toast.error("Не вдалося видалити акаунт. Спробуйте ще раз пізніше.");
        } finally {
            setIsDeleting(false);
        }
    }

    if (!currentUser) return <LoadingSpinner />;

    return (
        <div className="mx-auto max-w-4xl-p-4 sm:p-6">
            {/* Header */}
            <div className="mb-6 sm:mb-8">
                <h1 className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl">Налаштування</h1>
                <p>Керуйте своїми налаштуваннями та уподобаннями</p>
            </div>

            <div className="space-y-6 sm:space-y-8">
                {/* Profile Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <User className="size-5 mr-2" />
                            Інформація про профіль
                        </CardTitle>

                        <CardDescription>
                            Оновіть свою особисту інформацію та деталі профілю
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <Label htmlFor="name">Повне ім'я</Label>
                                <Input
                                    id="name"
                                    placeholder="Введіть своє повне ім'я"
                                    value={profileData.name}
                                    onChange={(e) => handleProfileChange("name", e.target.value)}
                                />
                            </div>

                            <div>
                                <Label htmlFor="phone">Номер телефону</Label>
                                <Input
                                    id="phone"
                                    placeholder="Введіть свій номер телефону"
                                    value={profileData.phone}
                                    onChange={(e) => handleProfileChange("phone", e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="location">Місцезнаходження</Label>
                            <Input
                                id="location"
                                placeholder="Введіть своє місто або регіон"
                                value={profileData.location}
                                onChange={(e) => handleProfileChange("location", e.target.value)}
                                />
                        </div>

                        <div>
                                <Label htmlFor="bio">Опис профілю</Label>
                                <Textarea
                                    id="bio"
                                    placeholder="Розкажіть про себе..."
                                    value={profileData.bio}
                                    onChange={(e) => handleProfileChange("bio", e.target.value)}
                                    rows={4}
                                />
                            </div>
                    </CardContent>
                </Card>

                {/* Pet Preferences */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <PawPrint className="size-5 mr-2" />
                            Уподобання щодо тварин
                        </CardTitle>

                        <CardDescription>
                            Встановіть свої уподобання, щоб отримати кращі рекомендації
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        {/* Pet Types */}

                        <div>
                            <Label className="text-base font-medium">Типи тварин</Label>
                            <p className="mb-3 text-sm">Виберіть типи тварин, які вас цікавлять</p>

                            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                                {[
                                    { value: "dog", label: "Собаки" },
                                    { value: "cat", label: "Коти" },
                                    { value: "bird", label: "Птахи" },
                                    { value: "rodent", label: "Гризуни" },
                                    { value: "other", label: "Інші" },
                                ].map((type) => (
                                    <div key={type.value} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={type.value}
                                            checked={preferences.petType.includes(type.value)}
                                            onCheckedChange={(checked) => handleArrayPreferenceChange("petType", type.value, checked)}
                                        />
                                        <Label htmlFor={type.value} className="capitalize">
                                            {type.label}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Separator />

                        {/* Pet Sizes */}
                        <div>
                            <Label className="text-base font-medium">Розміри тварин</Label>
                            <p className="mb-3 text-sm">Виберіть розміри тварин, які вас цікавлять</p>

                            <div className="grid grid-cols-3 gap-3">
                                {[
                                    { value: "small", label: "Малий" },
                                    { value: "medium", label: "Середній" },
                                    { value: "large", label: "Великий" }
                                ].map((size) => (
                                    <div key={size.value} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={size.value}
                                            checked={preferences.size.includes(size.value)}
                                            onCheckedChange={(checked) => handleArrayPreferenceChange("size", size.value, checked)}
                                        />
                                        <Label htmlFor={size.value} className="capitalize">
                                            {size.label}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Separator />

                            {/* Pet Ages */}
                        <div>
                            <Label className="text-base font-medium">Вік тварин</Label>
                            <p className="mb-3 text-sm">Виберіть вікові категорії тварин, які вас цікавлять</p>

                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                                {[
                                    { value: "young", label: "До 1 року" },
                                    { value: "adult", label: "1-5 років" },
                                    { value: "senior", label: "6+ років" },
                                ].map((age) => (
                                    <div key={age.value} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={age.value}
                                            checked={preferences.age.includes(age.value)}
                                            onCheckedChange={(checked) => handleArrayPreferenceChange("age", age.value, checked)}
                                        />
                                        <Label htmlFor={age.value} className="capitalize">
                                            {age.label}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Separator />

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {/* Activity Level */}
                            <div>
                                <Label htmlFor="activity-level">Рівень активності</Label>
                                <Select value={preferences.activityLevel} onValueChange={(value) => handlePreferenceChange("activityLevel", value)}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Виберіть рівень активності" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectItem value="none">Без уподобань</SelectItem>
                                        <SelectItem value="low">Низький</SelectItem>
                                        <SelectItem value="medium">Середній</SelectItem>
                                        <SelectItem value="high">Високий</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Living Space */}
                            <div>
                                <Label htmlFor="living-space">Ваш житловий простір</Label>
                                <Select value={preferences.livingSpace} onValueChange={(value) => handlePreferenceChange("livingSpace", value)}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Виберіть ваш житловий простір" />
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
                        </div>
                    
                        {/* Experience */}
                            <div>
                                <Label htmlFor="experience">Досвід із тваринами</Label>
                                <Select value={preferences.experience} onValueChange={(value) => handlePreferenceChange("experience", value)}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Виберіть ваш рівень досвіду" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="first-time">Немає досвіду</SelectItem>
                                        <SelectItem value="some">Маю деякий досвід</SelectItem>
                                        <SelectItem value="experienced">Маю багатий досвід</SelectItem>
                                        <SelectItem value="professional">Професіонал (ветеринар, кінолог, т.д.)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                    </CardContent>
                </Card>
                
                {/* Danger Zone */}
                <Card className="border-red-200">
                    <CardHeader>
                        <CardTitle className="flex items-center text-red-600">
                            <AlertTriangle className="size-5 mr-2" />
                        </CardTitle>
                        <CardDescription>
                            Тут ви можете назавжди видалити свій акаунт та всі пов'язані з ним дані. Ця дія незворотна, тому будьте обережні.
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                            <h2 className="mb-2 font-medium text-red-800">
                                Видалити акаунт
                            </h2>
                            <p className="mb-4 text-sm text-red-700">
                                Ця дія незворотна і приведе до видалення вашого акаунта, усіх доданих тварин, заявок, повідомлень та інших даних.
                            </p>

                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="destructive" disabled={isDeleting}>
                                        <Trash2 className="size-4 mr-2" />
                                        {isDeleting ? "Видаляємо..." : "Назавжди видалити акаунт"}
                                    </Button>
                                </AlertDialogTrigger>

                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>
                                            Ви впевнені, що хочете видалити свій акаунт?
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Ця дія незворотна. Всі ваші дані будуть видалені назавжди, включаючи: 

                                            <ul className="mt-2 list-disc list-inside space-y-1">
                                                <li>Ваш профіль та персональні дані</li>
                                                <li>Усі додані вами домашні тварини для прилаштування</li>
                                                <li>Усі подані вами заявки на прилаштування</li>
                                                <li>Усі повідомлення та розмови</li>
                                                <li>Всі налаштування та уподобання</li>
                                            </ul>
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>

                                    <AlertDialogFooter>
                                        <AlertDialogCancel>
                                            Скасувати
                                        </AlertDialogCancel>
                                        <AlertDialogAction onClick={handleDeleteAccount} className="bg-red-600 hover:bg-red-700">
                                            Так, видалити мій акаунт
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </CardContent>
                </Card>

                {/* Save Button */}
                <div className="flex justify-end">
                    <Button onClick={handleSave} disabled={isLoading} className="w-full sm:w-auto">
                        {isLoading ? (
                            <>
                            <div className="mr-2 size-4 animate-spin rounded-full border-2 border-white">
                            </div>
                                Збереження...
                            </>
                        ) : (
                            <>
                                <Save className="size-4 mr-2" />
                                Зберегти налаштування
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}