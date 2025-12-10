"use client";

import React from "react";
import RegionSelect from "../region/RegionSelect";

interface Props {
    mode: "satish" | "icare";

    rooms: string[];
    setRooms: (v: string[]) => void;

    selectedRegion: string;
    setSelectedRegion: (v: string) => void;

    selectedRegionItems: string[];
    setSelectedRegionItems: (v: string[]) => void;

    tempSelectedItems: string[];
    setTempSelectedItems: (v: string[]) => void;

    openModal: () => void;
}

const roomOptions = ["1", "2", "3", "4", "5+"];

// helper for button-checkbox toggle
const toggle = (
    value: string,
    array: string[],
    setter: (v: string[]) => void
) => {
    if (array.includes(value)) {
        setter(array.filter((i) => i !== value));
    } else {
        setter([...array, value]);
    }
};

export default function OfficeFilters({
                                          mode,
                                          rooms,
                                          setRooms,
                                          selectedRegion,
                                          setSelectedRegion,
                                          selectedRegionItems,
                                          setSelectedRegionItems,
                                          tempSelectedItems,
                                          setTempSelectedItems,
                                          openModal
                                      }: Props) {
    return (
        <div className="grid grid-cols-2 gap-6 mt-6">

            {/* SOL BLOK */}
            <div className="space-y-5">

                {/* Otaq sayı */}
                <div>
                    <label className="text-[12px] text-gray-600 font-semibold">
                        Otaq sayı
                    </label>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {roomOptions.map((r) => (
                            <button
                                key={r}
                                onClick={() => toggle(r, rooms, setRooms)}
                                className={`px-4 py-2 border rounded-md text-sm ${
                                    rooms.includes(r)
                                        ? "bg-yellow-400 text-white"
                                        : "bg-gray-100 text-gray-800"
                                }`}
                            >
                                {r}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Qiymət */}
                <div>
                    <label className="text-[12px] text-gray-600 font-semibold">
                        Qiymət (AZN)
                    </label>
                    <div className="flex gap-2 mt-1">
                        <input
                            className="border p-2 rounded-md w-28"
                            placeholder="min"
                        />
                        <input
                            className="border p-2 rounded-md w-28"
                            placeholder="max"
                        />
                    </div>
                </div>

                {/* Sahə */}
                <div>
                    <label className="text-[12px] text-gray-600 font-semibold">
                        Sahə (KVM)
                    </label>
                    <div className="flex gap-2 mt-1">
                        <input
                            className="border p-2 rounded-md w-28"
                            placeholder="min"
                        />
                        <input
                            className="border p-2 rounded-md w-28"
                            placeholder="max"
                        />
                    </div>
                </div>

                {/* Kredit — yalnız satışda */}
                {mode === "satish" && (
                    <div>
                        <label className="text-[12px] text-gray-600 font-semibold">
                            Kreditlə satış
                        </label>
                        <div className="flex gap-2 mt-1">
                            <input
                                className="border p-2 rounded-md w-28"
                                placeholder="İlkin ödəniş"
                            />
                            <input
                                className="border p-2 rounded-md w-28"
                                placeholder="Aylıq ödəniş"
                            />
                        </div>
                    </div>
                )}

            </div>

            {/* SAĞ BLOK */}
            <div className="space-y-5">

                {/* Əlavə tikili növü */}
                <div>
                    <label className="text-[12px] text-gray-600 font-semibold">
                        Əlavə tikilinin növü
                    </label>
                    <select className="border p-2 rounded-md w-full text-sm">
                        <option>Biznes mərkəzi</option>
                        <option>Həyət evi / villa</option>
                        <option>Yeni tikili</option>
                        <option>Köhnə tikili</option>
                    </select>
                </div>

                {/* Təmir səviyyəsi */}
                <div>
                    <label className="text-[12px] text-gray-600 font-semibold">
                        Təmir səviyyəsi
                    </label>
                    <select className="border p-2 rounded-md w-full text-sm">
                        <option>Təmirli</option>
                        <option>Təmirsiz</option>
                    </select>
                </div>

                {/* Çıxarış / İpoteka */}
                <div className="flex gap-6 mt-2 text-sm">
                    <label className="flex items-center gap-2">
                        <input type="checkbox" />
                        Çıxarış var
                    </label>

                    <label className="flex items-center gap-2">
                        <input type="checkbox" />
                        İpoteka var
                    </label>
                </div>

                {/* Azərbaycan rayonları */}
                <RegionSelect
                    selectedRegion={selectedRegion}
                    setSelectedRegion={setSelectedRegion}
                    selectedItems={selectedRegionItems}
                    setSelectedItems={setSelectedRegionItems}
                    tempItems={tempSelectedItems}
                    setTempItems={setTempSelectedItems}
                    openModal={openModal}
                />



            </div>
        </div>
    );
}
