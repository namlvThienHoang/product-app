"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { ReloadIcon } from "@radix-ui/react-icons"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"

import { updateProductSchema, type UpdateProductSchema } from "@/lib/validations"
import { Product } from "@/types/product"
import { productService } from "@/services/productService"
import { Input } from "@/components/ui/input"
import { enumCategories } from "../_lib/enums"

interface UpdateProductSheetProps
  extends React.ComponentPropsWithRef<typeof Sheet> {
  product: Product
}

export function UpdateProductSheet({ product, ...props }: UpdateProductSheetProps) {
  const [isUpdatePending, startUpdateTransition] = React.useTransition()
  console.log("product", product)

  const form = useForm<UpdateProductSchema>({
    resolver: zodResolver(updateProductSchema),
    defaultValues: {
      title: product.title ?? "",
      description: product.description,
      category: product.category,
      price: product.price,
      code: product.code,
      thumbnail: product.thumbnail,
      images: product.images
    },
  })

  React.useEffect(() => {
    form.reset({
      title: product.title ?? "",
      description: product.description,
      category: product.category,
      price: product.price,
      code: product.code,
      thumbnail: product.thumbnail,
      images: product.images
    })
  }, [product, form])

  function onSubmit(input: UpdateProductSchema) {
    startUpdateTransition(async () => {
      const data = await productService.updateProduct(product.id, input)

      if (data) {
        toast.error('update product error: ', data)
        return
      }

      form.reset()
      props.onOpenChange?.(false)
      toast.success("Product updated")
    })
  }

  return (
    <Sheet {...props}>
      <SheetContent className="flex flex-col gap-6 sm:max-w-md">
        <SheetHeader className="text-left">
          <SheetTitle>Update product</SheetTitle>
          <SheetDescription>
            Update the product details and save the changes
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Do a kickflip"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Do a kickflip"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Do a kickflip"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="capitalize">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {enumCategories.map((item) => (
                          <SelectItem
                            key={item}
                            value={item}
                            className="capitalize"
                          >
                            {item}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Do a kickflip"
                  className="resize-none"
                  {...field}
                />
                </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="thumbnail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Thumbnail</FormLabel>
              <FormControl>
                <Input
                    type="file"
                    placeholder="Upload an image"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Images</FormLabel>
              <FormControl>
                <Input
                    type="file"
                    placeholder="Upload an image"
                    className="resize-none"
                    multiple // Allows selection of multiple files
                    {...field}
                  />
                </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
            <SheetFooter className="gap-2 pt-2 sm:space-x-0">
              <SheetClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </SheetClose>
              <Button disabled={isUpdatePending}>
                {isUpdatePending && (
                  <ReloadIcon
                    className="mr-2 size-4 animate-spin"
                    aria-hidden="true"
                  />
                )}
                Save
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}