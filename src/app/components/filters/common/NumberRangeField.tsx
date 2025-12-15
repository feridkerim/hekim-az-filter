"use client";

import React from "react";
import { TextField, FormControl, FormLabel, Box } from "@mui/material";

interface NumberRangeFieldProps {
    label: string;
    minPlaceholder?: string;
    maxPlaceholder?: string;
    minWidth?: number | string;
    maxWidth?: number | string;
}

export const NumberRangeField: React.FC<NumberRangeFieldProps> = ({
                                                                      label,
                                                                      minPlaceholder = "min",
                                                                      maxPlaceholder = "max",
                                                                      minWidth = 110,   // approx ~w-28
                                                                      maxWidth = 110,
                                                                  }) => {
    return (
        <FormControl fullWidth sx={{ mt: 1 }}>
            <FormLabel sx={{ fontSize: 12, color: "#555", fontWeight: 600 }}>
                {label}
            </FormLabel>

            <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
                <TextField
                    type="number"
                    placeholder={minPlaceholder}
                    size="small"
                    sx={{ width: "100%" }}
                />

                <TextField
                    type="number"
                    placeholder={maxPlaceholder}
                    size="small"
                    sx={{ width: "100%" }}
                />
            </Box>
        </FormControl>
    );
};
