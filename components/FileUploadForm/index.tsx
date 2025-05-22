"use client";

import { JSX, PropsWithoutRef, useContext, useState } from 'react';
import { StatisticsContext } from '@/contexts/StatisticsContext';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import LoadingSpinner from '@/components/LoadingSpinner';

export const formSchema = z.object({
  file: z.instanceof(File)
    .refine((file) => file.size < 5000000, {
      message: 'Your file must be less than 5MB.',
    })
    .refine(file => file.name.match(/\.(sqlite3?|file)$/), {
      message: 'Unsupported file type. Please upload a .sqlite3 or .file file.',
    })
});

type FormData = z.infer<typeof formSchema>;

type FileUploadFormProps = PropsWithoutRef<JSX.IntrinsicElements["form"]>;

export default function FileUploadForm({ ...props }: FileUploadFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setFile } = useContext(StatisticsContext);
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const file = values.file;

    setFile(null);
    setIsLoading(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);

      setFile(uint8Array);
    } catch {
      form.setError("root", {
        message: "An error occurred while reading the file. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <Form {...form} {...props}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

        {form.formState.errors.root && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {form.formState.errors.root.message}
            </AlertDescription>
          </Alert>
        )}

        <FormField
          control={form.control}
          name="file"
          render={({ field: { onChange, value: _, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Upload file</FormLabel>

              <div className="flex flex-row gap-2 items-center">
                {isLoading && <LoadingSpinner />}

                <FormControl>
                  <Input
                    {...fieldProps}
                    type="file"
                    disabled={isLoading}
                    accept=".sqlite3"
                    onChange={(event) => {
                      onChange(event.target.files && event.target.files[0]);

                      form.handleSubmit(onSubmit)();
                    }}
                    name="file"
                  />
                </FormControl>
              </div>

              <FormDescription>
                Please upload your Kindle statistics.sqlite3 file.
              </FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
