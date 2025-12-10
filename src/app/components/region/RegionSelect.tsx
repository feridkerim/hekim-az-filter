"use client";

import React from "react";
import { RAYON_DATA } from "./RegionModal";

interface Props {
    selectedRegion: string;
    setSelectedRegion: (v: string) => void;

    selectedItems: string[];
    setSelectedItems: (v: string[]) => void;

    tempItems: string[];
    setTempItems: (v: string[]) => void;

    openModal: () => void;
}

export default function RegionSelect({
                                         selectedRegion,
                                         setSelectedRegion,
                                         selectedItems,
                                         setSelectedItems,
                                         tempItems,
                                         setTempItems,
                                         openModal,
                                     }: Props) {

    const getVisibleChips = () => {
        const result: string[] = [];

        Object.keys(RAYON_DATA).forEach((rayon) => {
            const q = RAYON_DATA[rayon];
            const allSelected = q.every(x => selectedItems.includes(x));
            const rayonSelected = selectedItems.includes(rayon);

            if (rayonSelected && allSelected) {
                result.push(rayon);
            } else {
                q.forEach(qs => {
                    if (selectedItems.includes(qs)) result.push(qs);
                });
            }
        });

        return result;
    };

    const chips = getVisibleChips();


    return (
        <div className="space-y-2">
            <label className="text-[12px] text-gray-600 font-semibold">
                Azərbaycan rayonları
            </label>

            <select
                className="border p-2 rounded-md w-full text-sm"
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
            >
                <option>Bakı</option>
                <option>Sumqayıt</option>
                <option>Abşeron</option>
                <option>Gəncə</option>
            </select>

            {selectedRegion === "Bakı" && (
                <button
                    onClick={openModal}
                    className="mt-2 px-4 py-2 border rounded-md bg-gray-100 text-sm"
                >
                    Rayon, Qəsəbə, Metro, Nişangah, MTK
                </button>
            )}

            {chips.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                    {chips.map((item) => (
                        <span
                            key={item}
                            className="bg-yellow-300 px-2 py-1 rounded text-xs flex items-center gap-1 border border-yellow-500"
                        >
                            {item}
                            <button
                                className="text-red-700 font-bold"
                                onClick={() => {
                                    let newList = selectedItems.filter(i => i !== item);

                                    if (RAYON_DATA[item]) {
                                        const all = RAYON_DATA[item];
                                        newList = newList.filter(i => !all.includes(i));
                                    }

                                    setSelectedItems(newList);
                                    setTempItems(newList);
                                }}
                            >
                                ✕
                            </button>
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}
