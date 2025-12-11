"use client";

import React from "react";
import { RAYON_DATA } from "./rayonData";

// Metro / Nişangah / MTK listlərini modal ilə eyni saxlayırıq
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
                                         openModal,
                                     }: Props) {

    // ----------------------------
    // RAYON-QƏSƏBƏ görünmə CHİPS
    // ----------------------------
    const getRayonChips = () => {
        const result: string[] = [];

        Object.keys(RAYON_DATA).forEach((rayon) => {
            const villages = RAYON_DATA[rayon];

            const rayonSelected = selectedItems.includes(rayon);
            const allVillagesSelected =
                villages.length > 0 &&
                villages.every((v) => selectedItems.includes(v));

            // Boş rayon → yalnız seçiləndə çixsin
            if (villages.length === 0 && !rayonSelected) return;

            if (rayonSelected || allVillagesSelected) {
                result.push(`${rayon} (${villages.length})`);
            } else {
                villages.forEach((v) => {
                    if (selectedItems.includes(v)) result.push(v);
                });
            }
        });

        return result;
    };

    // ----------------------------
    // METRO / NİŞANGAH / MTK chip
    // ----------------------------
    const getSimpleChips = () =>
        selectedItems.filter(
            (x) =>
                METRO_LIST.includes(x) ||
                NISANGAH_LIST.includes(x) ||
                MTK_LIST.includes(x)
        );

    const chips = [...getRayonChips(), ...getSimpleChips()];

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

            {/* MODAL AÇAN DÜYMƏ */}
            {selectedRegion === "Bakı" && (
                <button
                    onClick={openModal}
                    className="mt-2 px-4 py-2 border rounded-md bg-gray-100 text-sm"
                >
                    Rayon, Qəsəbə, Metro, Nişangah, MTK
                </button>
            )}

            {/* CHIP-LƏR */}
            {chips.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                    {chips.map((item) => (
                        <span
                            key={item}
                            className="bg-yellow-300 px-2 py-1 rounded text-xs border border-yellow-500"
                        >
                               {item}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}
