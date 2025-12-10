"use client";

import React from "react";
import RegionSelect from "../region/RegionSelect";

interface Props {
    mode: "satish" | "icare";

    rentTypes: string[];
    setRentTypes: (v: string[]) => void;

    rooms: string[];
    setRooms: (v: string[]) => void;

    floorPosition: {
        firstNot: boolean;
        topNot: boolean;
        onlyTop: boolean;
    };
    setFloorPosition: (v: { firstNot: boolean; topNot: boolean; onlyTop: boolean }) => void;

    selectedRegion: string;
    setSelectedRegion: (v: string) => void;

    selectedRegionItems: string[];
    setSelectedRegionItems: (v: string[]) => void;

    // 🔥 MODAL / TEMP SEÇİMLƏR ÜÇÜN
    tempSelectedItems: string[];
    setTempSelectedItems: (v: string[]) => void;

    openModal: () => void;
}

const roomOptions = ["1", "2", "3", "4", "5+"];

// button-checkbox helper
const toggle = (value: string, array: string[], setter: (v: string[]) => void) => {
    if (array.includes(value)) {
        setter(array.filter((i) => i !== value));
    } else {
        setter([...array, value]);
    }
};

export default function NewOldFilters({
                                          mode,
                                          rentTypes,
                                          setRentTypes,
                                          rooms,
                                          setRooms,
                                          floorPosition,
                                          setFloorPosition,
                                          selectedRegion,
                                          setSelectedRegion,
                                          selectedRegionItems,
                                          setSelectedRegionItems,
                                          tempSelectedItems,
                                          setTempSelectedItems,
                                          openModal,
                                      }: Props) {
    return (
        <div className="grid grid-cols-2 gap-6 mt-6">
            {/* SOL BLOK */}
            <div className="space-y-5">

                {/* Otaq sayı */}
                <div>
                    <label className="text-[12px] text-gray-600 font-semibold">Otaq sayı</label>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {roomOptions.map((r) => (
                            <button
                                key={r}
                                onClick={() => toggle(r, rooms, setRooms)}
                                className={`px-4 py-2 border rounded-md text-sm ${
                                    rooms.includes(r) ? "bg-yellow-400 text-white" : "bg-gray-100"
                                }`}
                            >
                                {r}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Qiymət */}
                <div>
                    <label className="text-[12px] text-gray-600 font-semibold">Qiymət (AZN)</label>
                    <div className="flex gap-2 mt-1">
                        <input className="border p-2 rounded-md w-28" placeholder="min" />
                        <input className="border p-2 rounded-md w-28" placeholder="max" />
                    </div>
                </div>

                {/* Sahə */}
                <div>
                    <label className="text-[12px] text-gray-600 font-semibold">Sahə (KVM)</label>
                    <div className="flex gap-2 mt-1">
                        <input className="border p-2 rounded-md w-28" placeholder="min" />
                        <input className="border p-2 rounded-md w-28" placeholder="max" />
                    </div>
                </div>

                {/* İcarə üçün Aylıq/Günlük */}
                {mode === "icare" && (
                    <div>
                        <label className="text-[12px] text-gray-600 font-semibold">İcarə növü</label>
                        <div className="flex gap-2 mt-2">
                            {["Aylıq", "Günlük"].map((opt) => (
                                <button
                                    key={opt}
                                    onClick={() => toggle(opt, rentTypes, setRentTypes)}
                                    className={`px-4 py-2 border rounded-md text-sm ${
                                        rentTypes.includes(opt)
                                            ? "bg-yellow-400 text-white"
                                            : "bg-gray-100"
                                    }`}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Kreditlə satış – yalnız satışda */}
                {mode === "satish" && (
                    <div>
                        <label className="text-[12px] text-gray-600 font-semibold">
                            Kreditlə satış
                        </label>
                        <div className="flex gap-2 mt-1">
                            <input className="border p-2 rounded-md w-28" placeholder="İlkin ödəniş" />
                            <input className="border p-2 rounded-md w-28" placeholder="Aylıq ödəniş" />
                        </div>
                    </div>
                )}
            </div>

            {/* SAĞ BLOK */}
            <div className="space-y-5">

                {/* Mərtəbə */}
                <div>
                    <label className="text-[12px] text-gray-600 font-semibold">Mərtəbə</label>
                    <div className="flex gap-2 mt-1">
                        <input className="border p-2 rounded-md w-24" placeholder="min" />
                        <input className="border p-2 rounded-md w-24" placeholder="max" />
                    </div>
                </div>

                {/* Mərtəbə sayı */}
                <div>
                    <label className="text-[12px] text-gray-600 font-semibold">Mərtəbə sayı</label>
                    <div className="flex gap-2 mt-1">
                        <input className="border p-2 rounded-md w-24" placeholder="min" />
                        <input className="border p-2 rounded-md w-24" placeholder="max" />
                    </div>
                </div>

                {/* Mərtəbə yerləşməsi */}
                    <div>
                    <label className="text-[12px] text-gray-600 font-semibold">
                        Mərtəbə yerləşməsi
                    </label>

                    <div className="flex flex-col gap-1 mt-1 text-sm">

                        {/* 1-ci olmasın */}
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={floorPosition.firstNot}
                                onChange={() => {
                                    const newVal = !floorPosition.firstNot;

                                    // Əgər bu seçilirsə → yalnız ən üst söndürülməlidir
                                    setFloorPosition({
                                        ...floorPosition,
                                        firstNot: newVal,
                                        onlyTop: newVal ? false : floorPosition.onlyTop,
                                    });
                                }}
                            />
                            1-ci olmasın
                        </label>

                        {/* Ən üst olmasın */}
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={floorPosition.topNot}
                                onChange={() => {
                                    const newVal = !floorPosition.topNot;

                                    // Bu seçilirsə → yalnız ən üst söndürülməlidir
                                    setFloorPosition({
                                        ...floorPosition,
                                        topNot: newVal,
                                        onlyTop: newVal ? false : floorPosition.onlyTop,
                                    });
                                }}
                            />
                            Ən üst olmasın
                        </label>

                        {/* Yalnız ən üst */}
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={floorPosition.onlyTop}
                                onChange={() => {
                                    const newVal = !floorPosition.onlyTop;

                                    if (newVal) {
                                        // Yalnız ən üst aktiv edilir → digərləri söndürülür
                                        setFloorPosition({
                                            firstNot: false,
                                            topNot: false,
                                            onlyTop: true,
                                        });
                                    } else {
                                        // Söndürülürsə → digərlərinin vəziyyəti dəyişmir
                                        setFloorPosition({
                                            ...floorPosition,
                                            onlyTop: false,
                                        });
                                    }
                                }}
                            />
                            Yalnız ən üst
                        </label>

                    </div>
                </div>



                {/* Təmir */}
                <div>
                    <label className="text-[12px] text-gray-600 font-semibold">Təmir səviyyəsi</label>
                    <select className="border p-2 rounded-md w-full text-sm">
                        <option>Təmirli</option>
                        <option>Təmirsiz</option>
                    </select>
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
