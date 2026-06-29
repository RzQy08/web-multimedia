<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Page extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'title',
        'status',
        'order',
    ];

    protected $casts = [
        'order' => 'integer',
    ];

    /**
     * Relasi ke semua section milik halaman ini.
     */
    public function sections()
    {
        return $this->hasMany(PageSection::class)->orderBy('order');
    }

    /**
     * Hanya section yang visible.
     */
    public function visibleSections()
    {
        return $this->hasMany(PageSection::class)
            ->where('is_visible', true)
            ->orderBy('order');
    }
}
