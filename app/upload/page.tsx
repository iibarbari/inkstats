import FileUploadForm from '@/components/FileUploadForm';

export default function UploadPage() {
  return (
    <main className="flex-grow-1 grid gap-12 my-16">
      <section className="container">
        <FileUploadForm />
      </section>
    </main>
  );
}
