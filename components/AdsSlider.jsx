"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

export function AdsSlider() {
    const [images, setImages] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)
    const [isDragging, setIsDragging] = useState(false)
    const [startX, setStartX] = useState(0)
    const [scrollLeft, setScrollLeft] = useState(0)
    const sliderRef = useRef(null)
    const autoPlayRef = useRef()

    useEffect(() => {
        async function fetchData() {
            const res = await fetch("https://stocktitan.site/api/announcement/images", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            })
            const data = await res.json()
            setImages(data?.images)
        }
        fetchData();
    }, [])

    useEffect(() => {
        if (isAutoPlaying && images.length > 0) {
            autoPlayRef.current = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % images.length)
            }, 4000)
        }

        return () => {
            if (autoPlayRef.current) {
                clearInterval(autoPlayRef.current)
            }
        }
    }, [isAutoPlaying, images.length])

    const handleDragStart = (e) => {
        setIsDragging(true)
        setIsAutoPlaying(false)
        const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
        setStartX(clientX)
        if (sliderRef.current) {
            setScrollLeft(sliderRef.current.scrollLeft)
        }
    }

    const handleDragMove = (e) => {
        if (!isDragging || !sliderRef.current) return
        e.preventDefault()
        const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
        const walk = (clientX - startX) * 2
        sliderRef.current.scrollLeft = scrollLeft - walk
    }

    const handleDragEnd = () => {
        if (!isDragging || !sliderRef.current) return
        setIsDragging(false)

        const slideWidth = sliderRef.current.offsetWidth
        const newIndex = Math.round(sliderRef.current.scrollLeft / slideWidth)
        setCurrentIndex(Math.max(0, Math.min(newIndex, images.length - 1)))

        setTimeout(() => setIsAutoPlaying(true), 2000)
    }

    const goToSlide = (index) => {
        setCurrentIndex(index)
        setIsAutoPlaying(false)
        setTimeout(() => setIsAutoPlaying(true), 2000)
    }

    // Sync scroll position with current index
    useEffect(() => {
        if (sliderRef.current && !isDragging) {
            const slideWidth = sliderRef.current.offsetWidth
            sliderRef.current.scrollTo({
                left: currentIndex * slideWidth,
                behavior: "smooth",
            })
        }
    }, [currentIndex, isDragging])

    if (images.length === 0) {
        return (
            <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Loading ads...</p>
            </div>
        )
    }

    return (
        <div className="relative w-full max-w-4xl mx-auto">
            {/* Main slider container */}
            <div
                ref={sliderRef}
                className={cn(
                    "flex overflow-x-auto scrollbar-hide snap-x snap-mandatory rounded-lg",
                    isDragging ? "cursor-grabbing" : "cursor-grab",
                )}
                onMouseDown={handleDragStart}
                onMouseMove={handleDragMove}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
                onTouchStart={handleDragStart}
                onTouchMove={handleDragMove}
                onTouchEnd={handleDragEnd}
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
                {images.map((image, index) => (
                    <div key={image.id} className="flex-shrink-0 w-full snap-center">
                        <div className="relative aspect-[16/9] bg-muted rounded-lg overflow-hidden">
                            <img
                                src={image.image_path || "/placeholder.svg"}
                                alt={`Advertisement ${image.id}`}
                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                draggable={false}
                                onError={(e) => {
                                    // Fallback to placeholder if image fails to load
                                    e.currentTarget.src = `/placeholder.svg?height=400&width=800&query=Advertisement ${image.id}`
                                }}
                            />
                            {/* Gradient overlay for better text readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Dot indicators */}
            <div className="flex justify-center gap-2 mt-4">
                {images.map((_, index) => (
                    <button
                        key={index}
                        className={cn(
                            "w-2 h-2 rounded-full transition-all duration-200",
                            index === currentIndex ? "bg-green-500 w-8" : "bg-green-800",
                        )}
                        onClick={() => goToSlide(index)}
                    />
                ))}
            </div>
        </div>
    )
}
