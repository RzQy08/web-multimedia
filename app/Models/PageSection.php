<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PageSection extends Model
{
    use HasFactory;

    protected $fillable = [
        'page_id',
        'section_type_id',
        'label',
        'order',
        'is_visible',
        'grapes_json',
        'html',
        'css',
    ];

    protected $casts = [
        'order'      => 'integer',
        'is_visible' => 'boolean',
    ];

    /**
     * Relasi ke halaman induk.
     */
    public function page()
    {
        return $this->belongsTo(Page::class);
    }

    /**
     * Relasi ke tipe section (hero, navbar, dll).
     */
    public function sectionType()
    {
        return $this->belongsTo(SectionType::class);
    }

    /**
     * Semua content key-value milik section ini.
     */
    public function contents()
    {
        return $this->hasMany(SectionContent::class);
    }

    /**
     * Helper: ambil content sebagai array key => value.
     */
    public function getContentsMapAttribute(): array
    {
        return $this->contents->pluck('value', 'content_key')->toArray();
    }
}
