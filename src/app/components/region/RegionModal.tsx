"use client";

import React, {useState, useMemo} from "react";
import {RAYON_DATA} from "./rayonData";

// Bu listləri istədiyin kimi artıra bilərsən
const METRO_LIST = [
    "28 May", "Gənclik", "Nərimanov", "Nizami", "İnşaatçılar", "Elmlər Akademiyası"
];

const NISANGAH_LIST = [
    "Gənclik Mall", "Tibb Universiteti", "ASAN Xidmət 1", "DOST Mərkəzi"
];

const MTK_LIST = [
    "Kristal Abşeron", "Pilot Layihəsi", "Yüksəliş MTK", "Mənzil Tikinti Kooperativi"
];

interface Props {
    isOpen: boolean;
    onClose: () => void;

    tempSelectedItems: string[];
    setTempSelectedItems: (v: string[]) => void;

    saveChanges: (raw: string[]) => void;
}

export default function RegionModal({
                                        isOpen,
                                        onClose,
                                        tempSelectedItems,
                                        setTempSelectedItems,
                                        saveChanges,
                                    }: Props) {

    if (!isOpen) return null;

    const [tab, setTab] = useState<"rayon" | "metro" | "nisangah" | "mtk">(
        "rayon"
    );

    const [search, setSearch] = useState("");

    // =========================================
    // 1) RAYON - QƏSƏBƏ məntiqi
    // =========================================

    const toggleRayon = (rayon: string) => {
        const villages = RAYON_DATA[rayon];
        let list = [...tempSelectedItems];

        const rayonSelected = list.includes(rayon);
        const allVillagesSelected =
            villages.length > 0 &&
            villages.every((v) => list.includes(v));

        if (rayonSelected || allVillagesSelected) {
            // rayon + qəsəbələri çıxar
            list = list.filter(
                (i) => i !== rayon && !villages.includes(i)
            );
        } else {
            // tam rayon seç
            list = list.filter((i) => !villages.includes(i));
            list.push(rayon);
        }

        setTempSelectedItems(list);
    };

    const toggleQesebe = (rayon: string, q: string) => {
        const villages = RAYON_DATA[rayon];
        let list = [...tempSelectedItems];

        const rayonSelected = list.includes(rayon);

        if (rayonSelected) {
            // rayon tam seçilib → açırıq
            list = villages.filter((x) => x !== q);
            setTempSelectedItems(list);
            return;
        }

        // ON/OFF
        if (list.includes(q)) list = list.filter((x) => x !== q);
        else list.push(q);

        // hamısı seçilibsə → rayona çevir
        const allSelected =
            villages.length > 0 &&
            villages.every((v) => list.includes(v));

        if (allSelected) {
            list = list.filter((x) => !villages.includes(x));
            list.push(rayon);
        }

        setTempSelectedItems(list);
    };

    // Rayon + Qəsəbə görünmə qaydası
    const getRayonVisibleChips = () => {
        const result: string[] = [];

        Object.keys(RAYON_DATA).forEach((rayon) => {
            const villages = RAYON_DATA[rayon];
            const rayonSelected = tempSelectedItems.includes(rayon);
            const allVillagesSelected =
                villages.length > 0 &&
                villages.every((v) => tempSelectedItems.includes(v));

            // boş rayon → seçilməyibsə göstərmə
            if (villages.length === 0 && !rayonSelected) return;

            if (rayonSelected || allVillagesSelected) {
                result.push(`${rayon} (${villages.length})`);
            } else {
                villages.forEach((q) => {
                    if (tempSelectedItems.includes(q)) result.push(q);
                });
            }
        });

        return result;
    };

    // =========================================
    // 2) SIMPLE MULTI SELECT (metro/nişangah/mtk)
    // =========================================

    const toggleSimple = (item: string) => {
        if (tempSelectedItems.includes(item)) {
            setTempSelectedItems(
                tempSelectedItems.filter((i) => i !== item)
            );
        } else {
            setTempSelectedItems([...tempSelectedItems, item]);
        }
    };

    const filterList = (list: string[]) => {
        if (!search) return list;
        return list.filter((x) =>
            x.toLowerCase().includes(search.toLowerCase())
        );
    };

    // =========================================
    // 3) BÜTÜN CHIP-LƏR
    // =========================================

    const chips = [
        ...getRayonVisibleChips(),

        // metro/nişangah/mtk seçilənləri göstər
        ...tempSelectedItems.filter(
            (x) =>
                METRO_LIST.includes(x) ||
                NISANGAH_LIST.includes(x) ||
                MTK_LIST.includes(x)
        ),
    ];

    // =========================================
    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white w-[760px] rounded-md p-6 relative">

                <button
                    onClick={onClose}
                    className="absolute right-4 top-3 text-xl font-bold"
                >
                    ✕
                </button>

                {/* TABS */}
                <div className="flex border-b mb-4">
                    {[
                        ["rayon", "Rayon / Qəsəbə"],
                        ["metro", "Metro"],
                        ["nisangah", "Nişangah"],
                        ["mtk", "MTK"],
                    ].map(([key, label]) => (
                        <button
                            key={key}
                            onClick={() => setTab(key as any)}
                            className={`px-4 py-2 text-sm border-r ${
                                tab === key
                                    ? "font-semibold border-b-2 border-blue-600"
                                    : "text-gray-600"
                            }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                {/* SEARCH */}
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full border p-2 rounded text-sm mb-4"
                    placeholder="Axtarış..."
                />

                {/* CONTENT */}
                <div className="max-h-[300px] overflow-y-auto space-y-3">

                    {tab === "rayon" &&
                        Object.keys(RAYON_DATA).map((rayon) => {
                            const villages = RAYON_DATA[rayon];

                            const matchRayon = rayon.toLowerCase().includes(search.toLowerCase());
                            const matchVillage = villages.some((q) =>
                                q.toLowerCase().includes(search.toLowerCase())
                            );

                            // Əgər rayon da, qəsəbələr də axtarışa uyğun gəlmirsə → göstərmə
                            if (search && !matchRayon && !matchVillage) return null;

                            return (
                                <div key={rayon}>
                                    <button
                                        onClick={() => toggleRayon(rayon)}
                                        className={`w-full text-left px-3 py-2 border rounded font-semibold ${
                                            tempSelectedItems.includes(rayon)
                                                ? "bg-yellow-300 border-yellow-500"
                                                : "bg-gray-100"
                                        }`}
                                    >
                                        {rayon}
                                    </button>

                                    <div className="ml-4 mt-2 space-y-1">
                                        {villages
                                            .filter((q) =>
                                                q
                                                    .toLowerCase()
                                                    .includes(search.toLowerCase())
                                            )
                                            .map((q) => (
                                                <button
                                                    key={q}
                                                    onClick={() => toggleQesebe(rayon, q)}
                                                    className={`w-full text-left px-3 py-1 border rounded text-sm ${
                                                        tempSelectedItems.includes(q) ||
                                                        tempSelectedItems.includes(rayon)
                                                            ? "bg-yellow-200 border-yellow-600"
                                                            : "bg-gray-100"
                                                    }`}
                                                >
                                                    {q}
                                                </button>
                                            ))}
                                    </div>
                                </div>
                            );
                        })}


                    {tab === "metro" &&
                        filterList(METRO_LIST).map((m) => (
                            <button
                                key={m}
                                onClick={() => toggleSimple(m)}
                                className={`w-full text-left px-3 py-2 border rounded ${
                                    tempSelectedItems.includes(m)
                                        ? "bg-yellow-200 border-yellow-600"
                                        : "bg-gray-100"
                                }`}
                            >
                                {m}
                            </button>
                        ))}

                    {tab === "nisangah" &&
                        filterList(NISANGAH_LIST).map((n) => (
                            <button
                                key={n}
                                onClick={() => toggleSimple(n)}
                                className={`w-full text-left px-3 py-2 border rounded ${
                                    tempSelectedItems.includes(n)
                                        ? "bg-yellow-200 border-yellow-600"
                                        : "bg-gray-100"
                                }`}
                            >
                                {n}
                            </button>
                        ))}

                    {tab === "mtk" &&
                        filterList(MTK_LIST).map((m) => (
                            <button
                                key={m}
                                onClick={() => toggleSimple(m)}
                                className={`w-full text-left px-3 py-2 border rounded ${
                                    tempSelectedItems.includes(m)
                                        ? "bg-yellow-200 border-yellow-600"
                                        : "bg-gray-100"
                                }`}
                            >
                                {m}
                            </button>
                        ))}
                </div>

                {/* CHIP-LƏR */}
                <div className="flex flex-wrap gap-2 mt-4 border-t pt-3">
                    {chips.map((chip) => (
                        <span
                            key={chip}
                            className="px-3 py-1 bg-gray-200 rounded-full text-sm"
                        >
                            {chip}
                        </span>
                    ))}
                </div>

                {/* FOOTER */}
                <div className="flex justify-between mt-4 border-t pt-4">
                    <button
                        onClick={() => setTempSelectedItems([])}
                        className="px-4 py-2 border rounded-md"
                    >
                        Təmizlə
                    </button>

                    <button
                        onClick={() => saveChanges(tempSelectedItems)}
                        className="px-6 py-2 bg-blue-600 text-white rounded-md"
                    >
                        Axtarışa əlavə et
                    </button>
                </div>
            </div>
        </div>
    );
}
