"use client"

import * as z from "zod"
import { Product } from "@prisma/client"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import axios from "axios"
import { toast } from "react-hot-toast"
import { AlertModel } from "@/components/models/alert-model"
import { Heading } from "@/components/ui/heading"
import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
 
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const formSchema =  z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  quantity: z.number(),
  price: z.number(),
  deliveredAt: z.date({
    required_error: "Delivery Date required.",
  })
})

type ProductFormValues = z.infer<typeof formSchema>

interface ProductFormProps {
  initialData: Product | null
}


export const ProductForm: React.FC<ProductFormProps> = ({
  initialData
}) => {

  const params = useParams()
  const router = useRouter()

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const title = initialData ? "Edit Product" : "Create Product"
  const description = initialData ? "Edit this Product" : "Create a Product"
  const toastMessage = initialData ? "Product Updated" : "Product Created"
  const actions = initialData ? "Save Changes" : "Create"

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {name: "", description: "", price: 0, quantity: 0, deliveredAt: new Date("2000-01-01")}
  })

  const onSubmit = async(data: ProductFormValues) => {
    try {
      setLoading(true)
      if (initialData) {
        axios.patch(`/api/products/${params.productId}`, data)
      } else {
        axios.post(`/api/products`, data)
      }
      router.refresh()
      router.push(`/admin/products`)
      toast.success(toastMessage)
    } catch(error) {
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const onDelete = async() => {
    try {
      setLoading(true)
      await axios.delete(`/api/products/${params.productId}`)
      router.refresh()
      router.push("/admin/products")
      toast.success("Product deleted")
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  return(
    <>
    <AlertModel
      isOpen = {open}
      onClose = {() => setOpen(false)}
      onConfirm = {onDelete}
      loading = {loading}
    />

    <div className = "flex items-center justify-between">
      <Heading
        title = {title}
        description = {description}
      />
      {initialData && (
        <Button disabled = {loading} variant = "destructive" size = "icon" onClick = {() => setOpen(true)}>
          <Trash className = "h-4 w-4" />
        </Button>
      )}
    </div>

    <Separator />

    <Form {...form}>
      <form onSubmit = {form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <div className = "grid grid-cols-3 gap-8">
          <FormField
            control = {form.control}
            name = "name"
            render={({field}) => (
              <FormItem>
                <FormLabel>Name</FormLabel>

                <FormControl>
                  <Input disabled = {loading} placeholder = "Product Name" {...field}/>
                </FormControl>
              <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control = {form.control}
            name = "description"
            render={({field}) => (
              <FormItem>
                <FormLabel>Description</FormLabel>

                <FormControl>
                  <Input disabled = {loading} placeholder = "Product Description" {...field}/>
                </FormControl>
              <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control = {form.control}
            name = "price"
            render={({field}) => (
              <FormItem>
                <FormLabel>Price</FormLabel>

                <FormControl>
                  <Input disabled = {loading} type="number" placeholder = "Product Price"  min={0} {...field} onChange={event => field.onChange(+event.target.value)} />
                </FormControl>
              <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control = {form.control}
            name = "quantity"
            render={({field}) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>

                <FormControl>
                  <Input disabled = {loading} type="number" placeholder = "Product Quantity" {...field} min={0} onChange={event => field.onChange(+event.target.value)}/>
                </FormControl>
              <FormMessage/>
              </FormItem>
            )}
          />

          <FormField
            control = {form.control}
            name = "deliveredAt"
            render={({field}) => (
              <FormItem>
                <FormLabel>Delivered</FormLabel><br />

                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[280px] justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                </Popover>
                </FormControl>
              <FormMessage/>
              </FormItem>
            )}
          />
        </div>

        <Button disabled = {loading} className = "ml-auto" type = "submit">
          {actions}
        </Button>

      </form>
    </Form>

    <Separator/>
    </>
  )
}