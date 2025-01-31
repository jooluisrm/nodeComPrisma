import { Prisma, PrismaClient } from "@prisma/client"
import { prisma } from "../libs/prisma"

export const createUser = async ({ name, email, password }: Prisma.UserCreateInput) => {
    try {
        const user = await prisma.user.create({
            data: { name, email, password }
        })
        return user
    } catch (error) {
        return false
    }
}

export const getAllUsers = async () => {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            status: true,
            role: true
        }
    });

    return users;
}

export const getUser = async (userId: number) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    });
    return user;
}


export const ativarUser = async (userId: number) => {
    const updatedUser = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            status: true
        }
    });
    return updatedUser;
}

export const desativarUser = async (userId: number) => {
    
    const updatedUser = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            status: false
        }
    });
    return updatedUser
}