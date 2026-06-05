import React, { useState, useRef, useEffect, useCallback } from 'react';
import { searchCities } from '../../api/weather';
import './SearchDropdown.scss';

export default function SearchDropdown({ onSelect, topCities }) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const debounceRef = useRef(null);
    const wrapperRef = useRef(null);

    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        setActiveIndex(-1);

        clearTimeout(debounceRef.current);
        if (value.length < 2) {
            setResults([]);
            setOpen(topCities.length > 0);
            return;
        }

        debounceRef.current = setTimeout(async () => {
        setLoading(true);
            try {
                const cities = await searchCities(value);
                setResults(cities);
                setOpen(true);
            } finally {
                setLoading(false);
            }
        }, 300);
    };

    const handleSelect = useCallback((city) => {
        setQuery(`${city.name}, ${city.country ?? ''}`);
        setOpen(false);
        setResults([]);
        onSelect(city);
    }, [onSelect]);

    const handleKeyDown = (e) => {
        const list = results.length ? results : topCities;
        if (!open || !list.length) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActiveIndex((i) => Math.min(i + 1, list.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActiveIndex((i) => Math.max(i - 1, 0));
        } else if (e.key === 'Enter' && activeIndex >= 0) {
            handleSelect(list[activeIndex]);
        } else if (e.key === 'Escape') {
            setOpen(false);
        }
    };

    useEffect(() => {
        const handler = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const listToShow = results.length > 0 ? results : (query.length < 2 ? topCities : []);
    const listLabel = results.length > 0 ? null : (query.length < 2 && topCities.length > 0 ? 'Top viewed cities' : null);

    return (
        <div className="search-dropdown" ref={wrapperRef}>
        <div className="input-group">
            <span className="input-group-text search-icon">
            {loading
                ? <span className="spinner-border spinner-border-sm" />
                : <i className="bi bi-search" />}
            </span>
            <input
                type="text"
                className="form-control search-input"
                placeholder="Search for a city…"
                value={query}
                onChange={handleChange}
                onFocus={() => setOpen(true)}
                onKeyDown={handleKeyDown}
                autoComplete="off"
                aria-label="City search"
                aria-autocomplete="list"
                aria-expanded={open}
            />
        </div>

        {open && listToShow.length > 0 && (
            <ul className="dropdown-results" role="listbox">
                {listLabel && (
                    <li className="dropdown-section-label">{listLabel}</li>
                )}
                {listToShow.map((city, i) => (
                    <li
                        key={city.id}
                        role="option"
                        aria-selected={i === activeIndex}
                        className={`dropdown-item-city ${i === activeIndex ? 'active' : ''}`}
                        onMouseDown={() => handleSelect(city)}
                        onMouseEnter={() => setActiveIndex(i)}
                    >
                        <i className="bi bi-geo-alt-fill me-2 text-primary" />
                        <span className="city-name">{city.name}</span>
                        <span className="city-country ms-1">{city.country}</span>
                    </li>
                ))}
            </ul>
        )}
        </div>
    );
}