<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SectionContent extends Model
{
    use HasFactory;

    protected $fillable = [
        'page_section_id',
        'content_key',
        'content_type',
        'value',
        'meta',
    ];

    protected $casts = [
        'meta' => 'array',
    ];

    /**
     * Relasi ke section induk.
     */
    public function pageSection()
    {
        return $this->belongsTo(PageSection::class);
    }
}
