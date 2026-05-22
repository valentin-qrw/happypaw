import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const createApplication = mutation({
    args: {
        petId: v.id("pets"),
        applicantId: v.id("users"),
        ownerId: v.id("users"),
        applicationData: v.object({
            experience: v.string(),
            livingSpace: v.string(),
            workSchedule: v.string(),
            otherPets: v.string(),
            reason: v.string(),
            references: v.optional(v.string()),
            additionalInfo: v.optional(v.string()),
        }),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("adoptionApplications", {
            ...args,
            status: "pending",
            createdAt: Date.now(),
            updatedAt: Date.now(),
        });
    },
});

export const getApplicationById = query({
    args: { id: v.id("adoptionApplications") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.id);
    },
});

export const getApplicationsByApplicant = query({
    args: {
        applicantId: v.id("users"),
    },
    handler: async (ctx, args) => {
        const applications = await ctx.db
        .query("adoptionApplications")
        .withIndex("by_applicant", (q) =>
            q.eq("applicantId", args.applicantId)
        )
        .collect();

        return await Promise.all(
        applications.map(async (application) => {
            const owner = await ctx.db.get(application.ownerId);
            const applicant = await ctx.db.get(application.applicantId);

            return {
            ...application,
            owner,
            applicant,
            };
        })
        );
    },
});

export const getApplicationsByOwner = query({
    args: {
        ownerId: v.id("users"),
    },
    handler: async (ctx, args) => {
        const applications = await ctx.db
        .query("adoptionApplications")
        .withIndex("by_owner", (q) => q.eq("ownerId", args.ownerId))
        .collect();

        return await Promise.all(
        applications.map(async (application) => {
            const owner = await ctx.db.get(application.ownerId);
            const applicant = await ctx.db.get(application.applicantId);

            return {
            ...application,
            owner,
            applicant,
            };
        })
        );
    },
});

export const updateApplicationStatus = mutation({
    args: {
        id: v.id("adoptionApplications"),
        status: v.string(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.patch(args.id, {
            status: args.status,
            updatedAt: Date.now(),
        });
    },
});

export const getApplicationByPetAndApplicant = query({
    args: {
        petId: v.id("pets"),
        applicantId: v.id("users"),
    },
    handler: async (ctx, args) => {
        const applications = await ctx.db
            .query("adoptionApplications")
            .withIndex("by_pet", (q) => q.eq("petId", args.petId))
            .collect();

        return applications.find((app) => app.applicantId === args.applicantId);
    },
});