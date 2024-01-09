interface Task {
    id: number,
    title: string,
    description?: string,
    isStared: boolean
    createdAt: Date
    status: string
}