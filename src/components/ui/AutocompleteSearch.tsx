// --- FILE: src/components/ui/AutocompleteSearch.tsx --- (UPDATED)
'use client';
import { useState, useEffect, useCallback } from 'react';
import { LoaderCircle, Search, X } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';

interface SearchResult { id: string; name: string; [key: string]: any; }
interface AutocompleteSearchProps { onSelect: (item: SearchResult | null) => void; searchApiUrl: string; placeholder: string; initialName?: string | null;}

export default function AutocompleteSearch({ onSelect, searchApiUrl, placeholder, initialName }: AutocompleteSearchProps) {
  const [query, setQuery] = useState(initialName || '');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => { setQuery(initialName || ''); }, [initialName]);

  const performSearch = useCallback(async (searchQuery: string) => {
    if (searchQuery.length < 2) { setResults([]); return; }
    setIsLoading(true);
    try {
      const response = await fetch(`${searchApiUrl}?query=${searchQuery}`);
      const data = await response.json();
      setResults(data);
    } catch (error) { setResults([]);
    } finally { setIsLoading(false); }
  }, [searchApiUrl]);

  useEffect(() => {
    // Only search if the query is not the same as the initial name
    if (debouncedQuery !== initialName) {
        performSearch(debouncedQuery);
    }
  }, [debouncedQuery, initialName, performSearch]);

  const handleSelect = (item: SearchResult) => {
    setQuery(item.name);
    setResults([]);
    onSelect(item);
  };
  
  const handleClear = () => { setQuery(''); setResults([]); onSelect(null); }

  return (
    <div className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gemini-gray-500 pointer-events-none" />
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} onFocus={() => setIsFocused(true)} onBlur={() => setTimeout(() => setIsFocused(false), 200)} placeholder={placeholder} className="w-full bg-gemini-gray-900 border border-gemini-gray-700 text-gemini-gray-300 text-sm rounded-lg p-2.5 pl-9 pr-9" />
        {isLoading && <LoaderCircle className="absolute right-9 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-gemini-blue" />}
        {query && !isLoading && <button type="button" onClick={handleClear} className="absolute right-2 top-1/2 -translate-y-1/2 p-1"><X className="h-4 w-4 text-gemini-gray-500 hover:text-gemini-gray-300"/></button>}
      </div>
      {isFocused && results.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-gemini-gray-700 border border-gemini-gray-600 rounded-lg shadow-lg max-h-60 overflow-auto">
          {results.map((item) => ( <li key={item.id} onMouseDown={() => handleSelect(item)} className="px-4 py-2 text-sm text-gemini-gray-300 hover:bg-gemini-blue/10 cursor-pointer">{item.name}</li> ))}
        </ul>
      )}
    </div>
  );
}