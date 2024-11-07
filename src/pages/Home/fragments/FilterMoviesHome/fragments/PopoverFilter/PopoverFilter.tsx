import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/utils/cn";
import { ChevronsUpDown } from "lucide-react";
import { Check, X } from "phosphor-react";
import { useState } from "react";

interface ISearchValues {
    value: string
    label: string
}

interface PopoverFilterProps {
    variant: "genre" | "releaseYear" | "duration"
    searchValues: ISearchValues[]
    valueSelected: string
    setValueSelected: React.Dispatch<React.SetStateAction<string>>
}

const PopoverFilter = ({ variant, searchValues, valueSelected, setValueSelected }: PopoverFilterProps) => {
    const [open, setOpen] = useState(false);

    const renderTitleAndPlaceholder = () => {
        switch (variant) {
            case "genre":
                return {
                    title: "Genêro",
                    placeholder: "Pesquise pelo gênero..."
                }
            case "releaseYear":
                return {
                    title: "Ano de lançamento",
                    placeholder: "Pesquise pelo ano de lançamento..."
                }
            case "duration":
                return {
                    title: "Duração",
                    placeholder: "Pesquise pela duração..."
                }
        }
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                >
                    {valueSelected
                        ? searchValues.find((item: ISearchValues) => item.value === valueSelected)?.label
                        : renderTitleAndPlaceholder().title}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command>
                    <CommandInput placeholder={renderTitleAndPlaceholder().placeholder} />
                    <CommandList>
                        <CommandEmpty>Sem resultados</CommandEmpty>
                        <CommandGroup>
                            <CommandItem onSelect={() => setValueSelected("")}>
                                <X className="mr-2 h-4 w-4 text-red-500" />
                                Remover filtro
                            </CommandItem>
                            {searchValues.map((item: ISearchValues) => (
                                <CommandItem
                                    key={item.value}
                                    value={item.value}
                                    onSelect={(currentValue) => {
                                        const newValue = currentValue === valueSelected ? "" : currentValue;
                                        setValueSelected(newValue);
                                        setOpen(false);
                                    }}
                                >

                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            valueSelected === item.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {item.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>)
}

export default PopoverFilter