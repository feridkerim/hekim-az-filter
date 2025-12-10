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

export default function FilterContainer() {


    const [type, setType] = useState("Yeni tikili");
    const [mode, setMode] = useState<"satish" | "icare">("satish");

    const [rooms, setRooms] = useState<string[]>([]);
    const [rentTypes, setRentTypes] = useState<string[]>([]);

    const [floorPosition, setFloorPosition] = useState({
        firstNot: false,
        topNot: false,
        onlyTop: false
    });

    const [selectedRegion, setSelectedRegion] = useState("Bakı");
    const [selectedRegionItems, setSelectedRegionItems] = useState<string[]>([]);

    // Modal üçün müvəqqəti seçimlər
    const [tempSelectedItems, setTempSelectedItems] = useState<string[]>([]);
    const [isRegionModalOpen, setIsRegionModalOpen] = useState(false);

    const resultCount = 245; // Mock nəticə

    // Modal açılır → filterdəki seçilmişlər temp'ə köçürülür
    const openRegionModal = () => {
        // Əgər temp boşdursa, ilk dəfə açılır → filterdən doldur
        if (tempSelectedItems.length === 0) {
            setTempSelectedItems([...selectedRegionItems]);
        }

        setIsRegionModalOpen(true);
    };

    // Modalda "Axtarışa əlavə et"

    const RAYON_DATA: Record<string, string[]> = {
        "Abşeron r.": [
            "Atyalı",
            "Ceyranbatan",
            "Çiçək",
            "Digah",
            "Fatmayı",
            "Görədil",
            "Güzdək",
            "Hökməli",
            "Masazır",
            "Mehdiabad",
            "Məhəmmədli",
            "Novxanı",
            "Nübar",
            "Perekəşkül",
            "Qobu",
            "Saray",
            "Zağulba",
        ],

        "Binəqədi r.": [
            "28 may",
            "6 mkr",
            "7 mkr",
            "8 mkr",
            "9 mkr",
            "Alatava 2",
            "Biləcəri",
            "Binəqədi",
            "Çermet",
            "Rəsulzadə",
            "Sulutəpə",
            "Xocəsən",
            "Xutor",
        ],

        "Nəsimi r.": ["1 mkr", "2 mkr", "3 mkr", "4 mkr", "5 mkr", "Kimya şəhərciyi", "Papanin"],

        "Nizami r.": ["8 km", "Keşlə"],

        "Pirallahı": [],

        "Qaradağ r.": [
            "Ələt",
            "Lökbatan",
            "Müşfiqabad",
            "Puta",
            "Qızıldaş",
            "Qobustan",
            "Sahil",
            "Səngəçal",
            "Şubanı",
            "Ümid",
        ],

        "Sabunçu r.": [
            "Albalı",
            "Bakıxanov",
            "Balaxanı",
            "Bilgəh",
            "Kürdəxanı",
            "Ləhic Bağları",
            "Maştağa",
            "Nardaran",
            "Pirşağı",
            "Ramana",
            "Sabunçu",
            "Savalan",
            "Şuşa",
            "Yeni Ramana",
            "Zabrat 1",
            "Zabrat 2",
        ],

        "Səbail r.": ["20-ci sahə", "Badamdar", "Bayıl", "Bibiheybət", "Şıxov"],

        "Suraxanı r.": [
            "Bahar",
            "Bülbülə",
            "Dədə Qorqud",
            "Əmircan",
            "Hövsan",
            "Qaraçuxur",
            "Yeni Günəşli",
            "Yeni Suraxanı",
            "Zığ",
        ],

        "Xətai r.": ["Ağ şəhər", "Əhmədli", "Həzi Aslanov", "Köhnə Günəşli", "NZS", "Qara şəhər"],

        "Xəzər r.": [
            "Binə",
            "Buzovna",
            "Dübəndi bağları",
            "Mərdəkan",
            "Qala",
            "Şağan",
            "Şüvəlan",
            "Türkan",
            "Xaşaxuna",
            "Zirə",
        ],

        "Yasamal r.": ["6-cı parallel", "Alatava 1", "Yeni Yasamal"],
    };
    const saveRegionChanges = (visibleChips: string[]) => {
        setSelectedRegionItems(visibleChips);
        setTempSelectedItems(tempSelectedItems); // daxili vəziyyət qorunur
        setIsRegionModalOpen(false);
    };



    // Filterləri sıfırla
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
        setIsRegionModalOpen(false); // <-- DÜZGÜN OLAN BUDUR
    };

    // Şərtlər
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

            {/* Tikilinin növü */}
            <TypeSelect value={type} onChange={setType} />

            {/* Filter blokları */}
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

            {/* MODAL */}
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

                <button className="px-6 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold">
                    Göstər ({resultCount})
                </button>
            </div>
        </div>
    );
}
