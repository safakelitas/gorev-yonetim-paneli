"use client";

import { useState } from "react";

type Task = {
  title: string;
  status: string;
  priority: string;
};

const statusOptions = ["Bekliyor", "Devam Ediyor", "Tamamlandı"];
const priorityOptions = ["Düşük", "Orta", "Yüksek"];

const statusStyle = (status: string) => {
  if (status === "Bekliyor") return "bg-yellow-100 text-yellow-700";
  if (status === "Devam Ediyor") return "bg-blue-100 text-blue-700";
  return "bg-green-100 text-green-700";
};

const priorityStyle = (priority: string) => {
  if (priority === "Yüksek") return "bg-red-100 text-red-700";
  if (priority === "Orta") return "bg-orange-100 text-orange-700";
  return "bg-slate-100 text-slate-700";
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([
    { title: "Haftalık iş planını güncelleme", status: "Bekliyor", priority: "Orta" },
    { title: "Aylık raporlama dosyasını hazırlama", status: "Devam Ediyor", priority: "Yüksek" },
    { title: "Raporlama ve sunumları hazırlama", status: "Devam Ediyor", priority: "Orta" },
    { title: "Proje dökümantasyonunu güncelleme", status: "Tamamlandı", priority: "Düşük" },
  ]);

  const [newTask, setNewTask] = useState("");
  const [newStatus, setNewStatus] = useState("Bekliyor");
  const [newPriority, setNewPriority] = useState("Orta");

  const [statusFilter, setStatusFilter] = useState("Tümü");
  const [priorityFilter, setPriorityFilter] = useState("Tümü");

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingStatus, setEditingStatus] = useState("Bekliyor");
  const [editingPriority, setEditingPriority] = useState("Orta");

  const filteredTasks = tasks.filter((task) => {
    const statusMatch = statusFilter === "Tümü" || task.status === statusFilter;
    const priorityMatch = priorityFilter === "Tümü" || task.priority === priorityFilter;
    return statusMatch && priorityMatch;
  });

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks([...tasks, { title: newTask, status: newStatus, priority: newPriority }]);
    setNewTask("");
    setNewStatus("Bekliyor");
    setNewPriority("Orta");
  };

  const deleteTask = (index: number) => {
    setTasks(tasks.filter((_, taskIndex) => taskIndex !== index));
  };

  const startEdit = (index: number, task: Task) => {
    setEditingIndex(index);
    setEditingStatus(task.status);
    setEditingPriority(task.priority);
  };

  const saveEdit = (index: number) => {
    setTasks(
      tasks.map((task, taskIndex) =>
        taskIndex === index
          ? { ...task, status: editingStatus, priority: editingPriority }
          : task
      )
    );
    setEditingIndex(null);
  };

  return (
    <main className="min-h-screen bg-slate-100 p-10">
      <div className="mx-auto max-w-5xl rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">Görev Yönetim Paneli</h1>
        <p className="mt-2 text-slate-500">
          Görevleri listeleyin, ekleyin, güncelleyin, silin ve filtreleyin.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-[1fr_180px_160px_100px]">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600">Görev Başlığı</label>
            <input
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Görev başlığı yazın..."
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-700"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600">Durum</label>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-700"
            >
              {statusOptions.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600">Öncelik</label>
            <select
              value={newPriority}
              onChange={(e) => setNewPriority(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-700"
            >
              {priorityOptions.map((priority) => (
                <option key={priority}>{priority}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-transparent">Ekle</label>
            <button
              onClick={addTask}
              className="w-full rounded-lg bg-slate-900 px-5 py-3 font-medium text-white hover:bg-slate-700"
            >
              Ekle
            </button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-[1fr_1fr_120px]">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600">Durum Filtresi</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-700"
            >
              <option>Tümü</option>
              {statusOptions.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600">Öncelik Filtresi</label>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-700"
            >
              <option>Tümü</option>
              {priorityOptions.map((priority) => (
                <option key={priority}>{priority}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-transparent">Listele</label>
            <button className="w-full rounded-lg border border-slate-300 px-5 py-3 font-medium hover:bg-slate-100">
              Listele
            </button>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          {filteredTasks.map((task, index) => (
            <div
              key={index}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-semibold text-slate-900">{task.title}</h2>

                  <div className="mt-2 flex gap-2">
                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyle(task.status)}`}>
                      {task.status}
                    </span>
                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${priorityStyle(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>
                </div>

                {editingIndex === index ? (
                  <div className="flex flex-wrap gap-2">
                    <select
                      value={editingStatus}
                      onChange={(e) => setEditingStatus(e.target.value)}
                      className="rounded-lg border px-3 py-2 text-sm"
                    >
                      {statusOptions.map((status) => (
                        <option key={status}>{status}</option>
                      ))}
                    </select>

                    <select
                      value={editingPriority}
                      onChange={(e) => setEditingPriority(e.target.value)}
                      className="rounded-lg border px-3 py-2 text-sm"
                    >
                      {priorityOptions.map((priority) => (
                        <option key={priority}>{priority}</option>
                      ))}
                    </select>

                    <button
                      onClick={() => saveEdit(index)}
                      className="rounded-lg bg-slate-900 px-4 py-2 text-sm text-white"
                    >
                      Kaydet
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(index, task)}
                      className="rounded-lg border px-4 py-2 text-sm hover:bg-slate-100"
                    >
                      Güncelle
                    </button>

                    <button
                      onClick={() => deleteTask(index)}
                      className="rounded-lg border border-red-300 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Sil
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {filteredTasks.length === 0 && (
            <p className="rounded-xl border border-dashed p-6 text-center text-slate-500">
              Seçilen filtrelere uygun görev bulunamadı.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}