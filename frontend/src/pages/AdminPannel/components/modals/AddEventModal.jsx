import React, { useEffect, useRef, useState } from 'react'
import { Calendar1Icon, Captions, Clock2, MapPin, SquareMinus, Users2, X } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import api from '../../../../services/api';
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

function    AddEventModal({ isOpen, onClose, fetchEvents }) {
    const [loading, setLoading] = useState(false);
    const [formdata, setformData] = useState({
        title: "",
        description: "",
        date: "",
        time: "",
        deadline: "",
        location: "",
        category: "",
        capacity: 0
    })
    const handleChange = (e) => {
        const { name, value } = e.target
        setformData((prev) => ({
            ...prev,
            [name]: value
        }))
    }




    const handleSubmit = async () => {
        console.log(formdata)
        try {
            setLoading(true);
            const response = await api.post("/event/create", {
                "title": formdata.title,
                "description": formdata.description,
                "eventdate": formdata.date,
                "eventtime": formdata.time,
                "registrationdeadline": formdata.deadline,
                "location": formdata.location,
                "capacity": formdata.capacity,
                "category":formdata.category
            })
            //  console.log(response)
            if (response.data.success) {
                toast.success("Event created")

            } else {
                toast.error(response)
            }
        } catch (error) {
            toast.error(error.response.data.msg)
        } finally {
            setLoading(false)
            fetchEvents();
        }

    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="w-[25vw]">
                <DialogHeader>
                    <DialogTitle>Add Event</DialogTitle>
                    <DialogDescription>
                        Enter your Event details below
                    </DialogDescription>
                </DialogHeader>
                <Card>
                    <CardContent className="no-scrollbar max-h-[50vh] overflow-y-auto">
                        <form>
                            <div className="flex flex-col gap-6 mt-2">
                                <Input name="title" value={formdata.title} onChange={handleChange} placeholder="Title" />
                                <Input name="description" value={formdata.description} onChange={handleChange} placeholder="Description" />
                                <Input type="date" name="date" value={formdata.date} onChange={handleChange} />
                                <Input type="time" name="time" value={formdata.time} onChange={handleChange} />
                                <Input type="date" name="deadline" value={formdata.deadline} onChange={handleChange} />
                                <Input name="location" value={formdata.location} onChange={handleChange} placeholder="Location" />

                                <Select
                                    value={formdata.category}
                                    onValueChange={(value) =>
                                        setformData((prev) => ({ ...prev, category: value }))
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="sports">Sports</SelectItem>
                                        <SelectItem value="workshop">Workshop</SelectItem>
                                        <SelectItem value="seminar">Seminar</SelectItem>
                                        <SelectItem value="cultural">Cultural</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>

                                <Input
                                    type="number"
                                    name="capacity"
                                    value={formdata.capacity}
                                    onChange={handleChange}
                                    placeholder="Capacity"
                                />
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" onClick={handleSubmit} disabled={loading}>
                            {loading ? "Submitting..." : "Submit"}
                        </Button>
                    </CardFooter>
                </Card>
            </DialogContent>
        </Dialog>
    )
}

export default AddEventModal