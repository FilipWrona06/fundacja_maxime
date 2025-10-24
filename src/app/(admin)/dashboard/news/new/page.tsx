import { createNewsArticle } from "@/actions/news";

export default function NewArticlePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Nowy Artykuł</h1>
      <form action={createNewsArticle} className="space-y-6">
        {/* Tutaj umieścimy pola formularza */}
        <div><label>Tytuł</label><input name="title" required /></div>
        <div><label>Data</label><input type="date" name="date" required /></div>
        <div><label>Wstęp (Excerpt)</label><textarea name="excerpt" required /></div>
        <div><label>Obraz</label><input type="file" name="image" required /></div>
        <div><label>Treść</label><textarea name="content" rows={10} required /></div>
        <button type="submit">Opublikuj Artykuł</button>
      </form>
    </div>
  );
}