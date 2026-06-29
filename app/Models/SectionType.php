<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SectionType extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'label',
        'fields_schema',
    ];

    protected $casts = [
        // Otomatis decode JSON saat diakses
        'fields_schema' => 'array',
    ];

    /**
     * Semua section yang memakai tipe ini.
     */
    public function pageSections()
    {
        return $this->hasMany(PageSection::class);
    }
}
