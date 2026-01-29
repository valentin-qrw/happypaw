"use client"

import React from 'react'
import { SignIn } from '@clerk/nextjs';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PawPrint, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8">
            <div className="text-center">
                <Link href="/" className=" mb-8 inline-flex items-center text-sm text-gray-600 hover:text-gray-900">
                    <ArrowLeft className="mr-2 size-4"  />
                    Назад на головну
                </Link>

                <div className="mb-4 flex justify-center">
                    <div className="flex size-16 items-center justify-center rounded-full bg-orange-500"> 
                        <PawPrint className="size-8 text-white" />
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-gray-900">
                    Ласкаво просимо до HappyPaw!
                </h1>
                <p className="mt-2">
                    Увійдіть у свій обліковий запис, щоб продовжити
                </p>
            </div>

            {/* SignIn Card */}
            <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                    <SignIn/>
                </CardContent>
            </Card>

            <div className="space-y-4 text-center">
                <p className="text-sm text-gray-500">Що ви отримаєте, увійшовши в систему?</p>

                <div className="grid grid-cols-1 gap-2 text-sm text-gray-600">
                    <div className="flex items-center justify-center space-x-2">
                        <div className="size-2 rounded-full bg-gray-500"></div>
                        <span>Персоналізовані рекомендації</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                        <div className="size-2 rounded-full bg-gray-500"></div>
                        <span>Приватні повідомлення з власниками</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                        <div className="size-2 rounded-full bg-gray-500"></div>
                        <span>Відстеження статусу заявок та сповіщення</span>
                    </div>
                </div>
            </div>   
        </div>
    </div>
  )
}
