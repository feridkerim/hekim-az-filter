"use client";

import React, { useState } from "react";

interface Props {
    isOpen: boolean;
    onClose: () => void;

    tempSelectedItems: string[];
    setTempSelectedItems: (v: string[]) => void;

    saveChanges: (visibleChips: string[]) => void;
}

export const RAYON_DATA: Record<string, string[]> = {
    "Abşeron r.": [
        "Atyalı","Ceyranbatan","Çiçək","Digah","Fatmayı","Görədil","Güzdək",
        "Hökməli","Masazır","Mehdiabad","Məhəmmədli","Novxanı","Nübar","Perekəşkül",
        "Qobu","Saray","Yeni Corat","Zağulba"
    ],

    "Binəqədi r.": [
        "28 may","6 mkr","7 mkr","8 mkr","9 mkr","Alatava 2","Biləcəri",
        "Binəqədi","Çermet","Rəsulzadə","Sulutəpə","Xocəsən","Xutor"
    ],

    "Nərimanov r.": ["Böyükşor","Montin"],
    "Nəsimi r.": ["1 mkr","2 mkr","3 mkr","4 mkr","5 mkr","Kimya şəhərciyi","Papanin"],
    "Nizami r.": ["8 km","Keşlə"],
    "Pirallahı": [],
    "Qaradağ r.": ["Ələt","Lökbatan","Müşfiqabad","Puta","Qızıldaş","Qobustan","Sahil","Səngəçal","Şubanı","Ümid"],

    "Sabunçu r.": [
        "Albalı","Bakıxanov","Balaxanı","Bilgəh","Kürdəxanı","Ləhic Bağları",
        "Maştağa","Nardaran","Pirşağı","Ramana","Sabunçu","Savalan","Şuşa",
        "Y.Ramana","Zabrat 1","Zabrat 2"
    ],

    "Səbail r.": ["20-ci sahə","Badamdar","Bayıl","Bibiheybət","Şıxov"],

    "Suraxanı r.": [
        "Bahar","Bülbülə","Dədə Qorqud","Əmircan","Hövsan",
        "Qaraçuxur","Y.Günəşli","Y.Suraxanı","Zığ"
    ],

    "Xətai r.": ["Ağ şəhər","Əhmədli","Həzi Aslanov","Köhnə Günəşli","NZS","Qara şəhər"],

    "Xəzər r.": [
        "Binə","Buzovna","Dübəndi bağları","Mərdəkan","Qala",
        "Şağan","Şüvəlan","Türkan","Xaşaxuna","Zirə"
    ],

    "Yasamal r.": ["6-cı parallel","Alatava 1","Yeni Yasamal"]
};

export default function RegionModal({
                                        isOpen,
                                        onClose,
                                        tempSelectedItems,
                                        setTempSelectedItems,
                                        saveChanges
                                    }: Props) {

    const [active, setActive] = useState<"rayon"|"metro"|"nisangah"|"mtk">("rayon");
    const [search, setSearch] = useState("");

    if (!isOpen) return null;


    // 🔥 Rayon klik → rayon + bütün qəsəbələri seç
    const toggleRayon = (rayon: string) => {
        const q = RAYON_DATA[rayon];
        const all = [rayon, ...q];

        const allSelected = all.every(x => tempSelectedItems.includes(x));

        if (allSelected) {
            setTempSelectedItems(tempSelectedItems.filter(i => !all.includes(i)));
        } else {
            setTempSelectedItems([...new Set([...tempSelectedItems, ...all])]);
        }
    };


    // 🔥 Qəsəbə klik → rayon çıxır, yalnız qalan qəsəbələr qalır
    const toggleQesebe = (rayon: string, qesebe: string) => {
        let list = [...tempSelectedItems];

        const remove = list.includes(qesebe);
        if (remove) list = list.filter(i => i !== qesebe);
        else list.push(qesebe);

        const qList = RAYON_DATA[rayon];
        const hasOthers = qList.some(q => list.includes(q));

        if (hasOthers) {
            list = list.filter(i => i !== rayon);
        }

        setTempSelectedItems(list);
    };


    // 🔵 Bu funksiya UI-də görünən chip-ləri qaytarır
    const getVisibleChips = () => {
        const result: string[] = [];

        Object.keys(RAYON_DATA).forEach(rayon => {
            const qesebeler = RAYON_DATA[rayon];

            const rayonSelected = tempSelectedItems.includes(rayon);
            const allQesebeSelected = qesebeler.every(q => tempSelectedItems.includes(q));

            if (rayonSelected && allQesebeSelected) {
                // ❗ Tam seçilibsə → yalnız rayon görünür
                result.push(rayon);
            } else {
                // ❗ Əks halda qalan qəsəbələr görünür
                qesebeler.forEach(q => {
                    if (tempSelectedItems.includes(q)) result.push(q);
                });
            }
        });

        return result;
    };



    const visibleChips = getVisibleChips();


    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white w-[760px] rounded-md p-6 relative">

                <button onClick={onClose} className="absolute right-4 top-3 text-xl font-bold">✕</button>

                <h2 className="text-lg font-semibold mb-4">Rayon / Qəsəbə / Metro / Nişangah / MTK</h2>

                {/* TABS */}
                <div className="flex border-b mb-3 text-sm">
                    {[
                        ["rayon", "Rayon & Qəsəbə"],
                        ["metro", "Metro"],
                        ["nisangah", "Nişangah"],
                        ["mtk", "MTK"]
                    ].map(([key, label]) => (
                        <button
                            key={key}
                            onClick={() => setActive(key as any)}
                            className={`px-4 py-2 border-r ${
                                active === key ? "border-b-2 border-blue-600 font-semibold" : ""
                            }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                {/* SEARCH */}
                <input
                    className="w-full border p-2 rounded mb-3 text-sm"
                    placeholder="Axtarış..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                {/* RAYON/QƏSƏBƏ LİSTİ */}
                {active === "rayon" && (
                    <div className="max-h-[300px] overflow-y-auto space-y-3">
                        {Object.keys(RAYON_DATA).map((rayon) => (
                            <div key={rayon}>
                                <button
                                    onClick={() => toggleRayon(rayon)}
                                    className={`w-full text-left px-3 py-2 border rounded-md font-semibold ${
                                        tempSelectedItems.includes(rayon)
                                            ? "bg-yellow-300 border-yellow-500"
                                            : "bg-gray-100 border-gray-300"
                                    }`}
                                >
                                    {rayon}
                                </button>

                                <div className="ml-4 mt-2 space-y-1">
                                    {RAYON_DATA[rayon].map((q) => (
                                        <button
                                            key={q}
                                            onClick={() => toggleQesebe(rayon, q)}
                                            className={`w-full text-left px-3 py-1 border rounded text-sm ${
                                                tempSelectedItems.includes(q)
                                                    ? "bg-yellow-200 border-yellow-500"
                                                    : "bg-gray-100 border-gray-300"
                                            }`}
                                        >
                                            {q}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* SELECTED CHIPS */}
                <div className="flex flex-wrap gap-2 mt-4 border-t pt-3">
                    {visibleChips.map((item) => (
                        <span
                            key={item}
                            className="px-3 py-1 bg-gray-200 rounded-full text-sm flex items-center gap-1"
                        >
                            {item}
                            <button
                                onClick={() =>
                                    setTempSelectedItems(tempSelectedItems.filter(i => i !== item))
                                }
                                className="text-red-600"
                            >
                                ✕
                            </button>
                        </span>
                    ))}
                </div>

                {/* FOOTER */}
                <div className="flex justify-between mt-4 border-t pt-3">
                    <button
                        onClick={() => setTempSelectedItems([])}
                        className="px-4 py-2 border rounded-md text-sm"
                    >
                        Təmizlə
                    </button>

                    <button
                        onClick={() => saveChanges(visibleChips)}
                        className="px-5 py-2 bg-blue-600 text-white rounded-md text-sm"
                    >
                        Axtarışa əlavə et
                    </button>
                </div>
            </div>
        </div>
    );
}
