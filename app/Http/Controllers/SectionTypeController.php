<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SectionType;
use Illuminate\Http\JsonResponse;

class SectionTypeController extends Controller
{
    /**
     * GET /api/section-types
     * Daftar semua tipe section yang tersedia.
     * Dipakai admin React saat mau "Add Section" — pilih tipe dulu.
     */
    public function index(): JsonResponse
    {
        $types = SectionType::orderBy('id')->get();

        return response()->json([
            'success' => true,
            'data'    => $types,
        ]);
    }

    /**
     * GET /api/section-types/{id}
     * Detail satu tipe section beserta fields_schema-nya.
     * Dipakai admin React untuk render form dinamis sesuai schema.
     */
    public function show(SectionType $sectionType): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data'    => $sectionType,
        ]);
    }
}
