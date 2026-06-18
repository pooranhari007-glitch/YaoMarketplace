import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import StayPage from "./pages/StayPage";
import EventsPage from "./pages/EventsPage";
import ContentPage from "./pages/ContentPage";
import BookPage from "./pages/BookPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="stay" element={<StayPage />} />
        <Route path="events" element={<EventsPage />} />
        <Route path="gallery" element={<ContentPage slug="gallery" />} />
        <Route path="policies" element={<ContentPage slug="policies" />} />
        <Route path="faq" element={<ContentPage slug="faq" />} />
        <Route path="book" element={<BookPage />} />
      </Route>
    </Routes>
  );
}
