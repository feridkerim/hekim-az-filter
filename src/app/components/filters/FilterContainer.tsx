"use client";

import React, { useState } from "react";
import TypeSelect from "./TypeSelect";
import NewOldFilters from "./NewOldFilters";
import LandHouseFilters from "./LandHouseFilters";
import OfficeFilters from "./OfficeFilters";
import GarageFilters from "./GarageFilters";
import LandFilters from "./LandFilters";
import ObjectFilters from "./ObjectFilters";
import ResortFilters from "./ResortFilters";

import RegionModal from "../region/RegionModal";
import RegionSelect from "../region/RegionSelect";

import { buildSearchQuery } from "./buildQuery";
import type { FloorPosition } from "./buildQuery";
import { useRouter } from "next/navigation";

export default function FilterContainer() {
    const router = useRouter();

    // SATIŞ / İCARƏ
    const [mode, setMode] = useState<"satish" | "icare">("satish");

    // TİKİLİ TÜRÜ
    const [type, setType] = useState("Yeni tikili");

    // OTAQ SAYI
    const [rooms, setRooms] = useState<string[]>([]);

    // İCARƏ TÜRÜ
    const [rentTypes, setRentTypes] = useState<string[]>([]);

    // MƏRTƏBƏ PARAMETRLƏRİ
    const [floorPosition, setFloorPosition] = useState<FloorPosition>({
        firstNot: false,
        topNot: false,
        onlyTop: false
    });

    // ----------------------------
    // REGION FILTER STRUCTURE
    // ----------------------------

    // Şəhər seçimi
    const [selectedRegion, setSelectedRegion] = useState("Bakı");

    // Bütün seçimlər (rayon + qəsəbə + metro + nişangah + MTK)
    const [selectedRegionItems, setSelectedRegionItems] = useState<string[]>([]);

    // Modal üçün müvəqqəti data
    const [tempSelectedItems, setTempSelectedItems] = useState<string[]>([]);

    const [isRegionModalOpen, setIsRegionModalOpen] = useState(false);

    // ----------------------------
    // REGION MODAL AÇ
    // ----------------------------
    const openRegionModal = () => {
        setTempSelectedItems([...selectedRegionItems]);
        setIsRegionModalOpen(true);
    };

    // ----------------------------
    // MODAL → YEKUN SEÇİMLƏRİN SAXLANMASI
    // ----------------------------
    const saveRegionChanges = (rawSelected: string[]) => {
        setSelectedRegionItems(rawSelected); // əsas filter state
        setTempSelectedItems(rawSelected);   // modal açılanda eyni olsun
        setIsRegionModalOpen(false);
    };

    // ----------------------------
    // RESET BÜTÜN FİLTERLƏR
    // ----------------------------
    const resetFilters = () => {
        setType("Yeni tikili");
        setMode("satish");
        setRooms([]);
        setRentTypes([]);

        setFloorPosition({
            firstNot: false,
            topNot: false,
            onlyTop: false
        });

        setSelectedRegion("Bakı");
        setSelectedRegionItems([]);
        setTempSelectedItems([]);
        setIsRegionModalOpen(false);
    };

    const resultCount = 245;

    // ----------------------------
    // NƏTİCƏLƏRİ GÖSTƏR
    // ----------------------------
    const handleShowResults = () => {
        const query = buildSearchQuery({
            mode,
            type,
            rooms,
            rentTypes,
            floorPosition,
            selectedRegion,
            selectedRegionItems,
        });

        router.push(`/elanlar?${query}`);
    };

    // ----------------------------
    // HANSİ FİLTER BLoku göstərilsin?
    // ----------------------------
    const isNewOrOld = type === "Yeni tikili" || type === "Köhnə tikili";
    const isLandHouse = ["Həyət evi", "Villa", "Bağ evi"].includes(type);
    const isOffice = type === "Ofis";
    const isGarage = type === "Qaraj";
    const isLand = type === "Torpaq";
    const isObject = type === "Obyekt";
    const isResort = type === "İstirahət mərkəzləri";

    return (
        <div className="p-5 bg-white rounded border w-full max-w-5xl mx-auto space-y-4">

            {/* SATIŞ / İCARƏ */}
            <div className="flex gap-2">
                <button
                    onClick={() => setMode("satish")}
                    className={`px-6 py-2 rounded-md border font-semibold text-sm ${
                        mode === "satish"
                            ? "bg-yellow-500 text-white border-yellow-600"
                            : "bg-gray-200 text-gray-700 border-gray-300"
                    }`}
                >
                    SATIŞ
                </button>
                <button
                    onClick={() => setMode("icare")}
                    className={`px-6 py-2 rounded-md border font-semibold text-sm ${
                        mode === "icare"
                            ? "bg-yellow-500 text-white border-yellow-600"
                            : "bg-gray-200 text-gray-700 border-gray-300"
                    }`}
                >
                    İCARƏ
                </button>
            </div>

            {/* TİKİLİ NÖVÜ */}
            <TypeSelect value={type} onChange={setType} />

            {/* FİLTER BLOKLARI */}
            {isNewOrOld && (
                <NewOldFilters
                    mode={mode}
                    rentTypes={rentTypes}
                    setRentTypes={setRentTypes}
                    rooms={rooms}
                    setRooms={setRooms}
                    floorPosition={floorPosition}
                    setFloorPosition={setFloorPosition}
                    selectedRegion={selectedRegion}
                    setSelectedRegion={setSelectedRegion}
                    selectedRegionItems={selectedRegionItems}
                    setSelectedRegionItems={setSelectedRegionItems}
                    tempSelectedItems={tempSelectedItems}
                    setTempSelectedItems={setTempSelectedItems}
                    openModal={openRegionModal}
                />
            )}

            {isLandHouse && (
                <LandHouseFilters
                    mode={mode}
                    rooms={rooms}
                    setRooms={setRooms}
                    rentTypes={rentTypes}
                    setRentTypes={setRentTypes}
                    floorPosition={floorPosition}
                    setFloorPosition={setFloorPosition}
                    selectedRegion={selectedRegion}
                    setSelectedRegion={setSelectedRegion}
                    selectedRegionItems={selectedRegionItems}
                    setSelectedRegionItems={setSelectedRegionItems}
                    tempSelectedItems={tempSelectedItems}
                    setTempSelectedItems={setTempSelectedItems}
                    openModal={openRegionModal}
                />
            )}

            {isOffice && (
                <OfficeFilters
                    mode={mode}
                    rooms={rooms}
                    setRooms={setRooms}
                    selectedRegion={selectedRegion}
                    setSelectedRegion={setSelectedRegion}
                    selectedRegionItems={selectedRegionItems}
                    setSelectedRegionItems={setSelectedRegionItems}
                    tempSelectedItems={tempSelectedItems}
                    setTempSelectedItems={setTempSelectedItems}
                    openModal={openRegionModal}
                />
            )}

            {isGarage && (
                <GarageFilters
                    mode={mode}
                    selectedRegion={selectedRegion}
                    setSelectedRegion={setSelectedRegion}
                    selectedRegionItems={selectedRegionItems}
                    setSelectedRegionItems={setSelectedRegionItems}
                    tempSelectedItems={tempSelectedItems}
                    setTempSelectedItems={setTempSelectedItems}
                    openModal={openRegionModal}
                />
            )}

            {isLand && (
                <LandFilters
                    mode={mode}
                    selectedRegion={selectedRegion}
                    setSelectedRegion={setSelectedRegion}
                    selectedRegionItems={selectedRegionItems}
                    setSelectedRegionItems={setSelectedRegionItems}
                    tempSelectedItems={tempSelectedItems}
                    setTempSelectedItems={setTempSelectedItems}
                    openModal={openRegionModal}
                />
            )}

            {isObject && (
                <ObjectFilters
                    mode={mode}
                    selectedRegion={selectedRegion}
                    setSelectedRegion={setSelectedRegion}
                    selectedRegionItems={selectedRegionItems}
                    setSelectedRegionItems={setSelectedRegionItems}
                    tempSelectedItems={tempSelectedItems}
                    setTempSelectedItems={setTempSelectedItems}
                    openModal={openRegionModal}
                />
            )}

            {isResort && (
                <ResortFilters
                    mode={mode}
                    selectedRegion={selectedRegion}
                    setSelectedRegion={setSelectedRegion}
                    selectedRegionItems={selectedRegionItems}
                    setSelectedRegionItems={setSelectedRegionItems}
                    tempSelectedItems={tempSelectedItems}
                    setTempSelectedItems={setTempSelectedItems}
                    openModal={openRegionModal}
                />
            )}

            {/* REGION MODAL */}
            <RegionModal
                isOpen={isRegionModalOpen}
                onClose={() => setIsRegionModalOpen(false)}
                tempSelectedItems={tempSelectedItems}
                setTempSelectedItems={setTempSelectedItems}
                saveChanges={saveRegionChanges}
            />

            {/* ALT PANEL */}
            <div className="flex justify-between pt-4 border-t mt-4">
                <button
                    onClick={resetFilters}
                    className="px-4 py-2 border rounded-md text-sm text-gray-800"
                >
                    Seçimləri sıfırla
                </button>

                <button
                    onClick={handleShowResults}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold"
                >
                    Göstər ({resultCount})
                </button>
            </div>
        </div>
    );
}
