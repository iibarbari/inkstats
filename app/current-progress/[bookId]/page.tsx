type Props = {
  params: {
    bookId: string;
  };
}

export default function BookDetailPage({ params }: Props) {
  return (
    <main className="flex-grow-1 grid gap-12 my-16">
      <section className="container">
        <h1>Book Detail Page</h1>
        <p>This is the detail page for book with ID: {params.bookId}</p>
      </section>
    </main>
  );
}
