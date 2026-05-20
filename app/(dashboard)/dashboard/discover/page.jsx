"use client";

import { use, useState } from "react";
import { useQuery } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { api } from "@/convex/_generated/api";
import PetCard from "@/components/pet-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
    Select, 
    SelectValue, 
    SelectItem, 
    SelectContent, 
    SelectTrigger 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import LoadingSpinner from "@/components/loading-spinner";

export default function DiscoverPage() {
    const { user } = useUser();
    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState({
        type: "",
        breed: "",
        size: "",
        age: "",
        gender: "",
        activityLevel: "",
        goodWithKids: "",
        goodWithPets: "",
        location: "",
    });

    const currentUser = useQuery(api.users.getUserByClerkId, user?.id ? { clerkId: user.id } : "skip");
    const allPets = useQuery(api.pets.getAllPets);
    const filteredPets = useQuery(api.pets.getFilteredPets, { searchTerm, filters });
    const pets = filteredPets || allPets || [];

    const handleFilterChange = (key, value) => {
        setFilters((prev) => ({
            ...prev,
            [key]: value === "all" ? "" : value,
        }));
    };

    const clearFilters = () => {
        setFilters({
            type: "",
            breed: "",
            size: "",
            age: "",
            gender: "",
            activityLevel: "",
            goodWithKids: "",
            goodWithPets: "",
            location: "",
        });
        setSearchTerm("");
    };

    const activeFiltersCount = Object.values(filters).filter(Boolean).length + (searchTerm ? 1 : 0);


    if (!currentUser) {
        return <LoadingSpinner />
    }

    return (
        <div className="p-6">
            <div className="mb-8">
                <h1 className="mb-2 text-3xl font-bold">
                    Пошук
                </h1>
                <p>Знайдіть свого ідеального компаньйона серед усіх доступних тварин</p>
            </div>

            {/* Search and filters */}
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Filter className="size-5" />
                            <span>Пошук і фільтри</span>

                            {activeFiltersCount > 0 && (
                                <Badge variant="secondary"> Активних: {activeFiltersCount}</Badge>
                            )}
                        </div>

                        {activeFiltersCount > 0 && (
                            <Button variant="outline" size="sm" onClick={clearFilters}>
                                <X className="mr-2 size-4" />
                                Очистити все
                            </Button>
                        )}
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* Search bar */}

                    <div className="relative">
                        <Search className="absolute top-1/2 left-3 size-4 -translate-1/2 transform text-gray-400" />
                        <Input
                            placeholder="Пошук за ім’ям, породою або описом..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)} 
                            className="pl-10"
                        />
                    </div>

                    {/* Filter */}

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <div>
                            <Label className="mb-2 block text-sm font-medium text-gray-700">
                                Тип тварини
                            </Label>
                            <Select value={filters.type} onValueChange={(value) => handleFilterChange("type", value)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Всі типи" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="all">Всі типи</SelectItem>
                                    <SelectItem value="dog">Собака</SelectItem>
                                    <SelectItem value="cat">Кіт</SelectItem>
                                    <SelectItem value="bird">Птах</SelectItem>
                                    <SelectItem value="rodent">Гризун</SelectItem>
                                    <SelectItem value="other">Інше</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label className="mb-2 block text-sm font-medium text-gray-700">
                                Розмір
                            </Label>
                            <Select value={filters.size} onValueChange={(value) => handleFilterChange("size", value)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Всі розміри" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="all">Всі розміри</SelectItem>
                                    <SelectItem value="small">Малий</SelectItem>
                                    <SelectItem value="medium">Середній</SelectItem>
                                    <SelectItem value="large">Великий</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label className="mb-2 block text-sm font-medium text-gray-700">
                                Вік
                            </Label>
                            <Select value={filters.age} onValueChange={(value) => handleFilterChange("age", value)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Будь-який вік" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="all">Будь-який вік</SelectItem>
                                    <SelectItem value="young">До 1 року</SelectItem>
                                    <SelectItem value="adult">1-5 років</SelectItem>
                                    <SelectItem value="senior">6+ років</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label className="mb-2 block text-sm font-medium text-gray-700">
                                Стать
                            </Label>
                            <Select value={filters.gender} onValueChange={(value) => handleFilterChange("gender", value)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Будь-яка стать" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="all">Будь-яка стать</SelectItem>
                                    <SelectItem value="male">Самець</SelectItem>
                                    <SelectItem value="female">Самка</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label className="mb-2 block text-sm font-medium text-gray-700">
                                Рівень активності
                            </Label>
                            <Select value={filters.activityLevel} onValueChange={(value) => handleFilterChange("activityLevel", value)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Будь-який рівень" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="all">Будь-який рівень</SelectItem>
                                    <SelectItem value="low">Низький</SelectItem>
                                    <SelectItem value="medium">Середній</SelectItem>
                                    <SelectItem value="high">Високий</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label className="mb-2 block text-sm font-medium text-gray-700">
                                Ладить з дітьми
                            </Label>
                            <Select value={filters.goodWithKids} onValueChange={(value) => handleFilterChange("goodWithKids", value)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Не має значення" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="all">Не має значення</SelectItem>
                                    <SelectItem value="true">Так</SelectItem>
                                    <SelectItem value="false">Ні</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label className="mb-2 block text-sm font-medium text-gray-700">
                                Ладить з іншими тваринами
                            </Label>
                            <Select value={filters.goodWithPets} onValueChange={(value) => handleFilterChange("goodWithPets", value)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Не має значення" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="all">Не має значення</SelectItem>
                                    <SelectItem value="true">Так</SelectItem>
                                    <SelectItem value="false">Ні</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label className="mb-2 block text-sm font-medium text-gray-700">
                                Місцезнаходження
                            </Label>
                            <Input
                                placeholder="Введіть адресу"
                                value={filters.location}
                                onChange={(e) => handleFilterChange("location", e.target.value)} 
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* results */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-semibold">
                        Знайдено: {pets.length} 
                    </h2>
                </div>
            </div>

            {pets.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {pets.map((pet) => (
                        <PetCard key={pet._id} pet={pet} currentUserId={currentUser._id} />
                    ))}
                </div>
            ) : (
                <Card className="py-12 text-center">
                    <CardContent>
                        <Search className="mx-auto mb-4 size-12 text-gray-400"/>
                        <h3 className="mb-2 text-lg font-semibold text-gray-900">
                            Тварин не знайдено
                        </h3>
                        <p className="mb-4">
                            Спробуйте змінити параметри пошуку або фільтри.
                        </p>

                        <Button onClick={clearFilters}>Очистити фільтри</Button>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}    