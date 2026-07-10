"use client";

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Truque para o ícone do marcador
const iconePadrao = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// A NOSSA BASE DE DADOS DE LOCAIS
const locais = [
    { id: 1, tipo: 'festa', coords: [41.3833, -8.3333], titulo: '📍 Recinto da Festa', desc: 'O coração da Romaria' },
    { id: 2, tipo: 'comboio', coords: [41.3850, -8.3300], titulo: '🚂 Apeadeiro de Moreira', desc: 'Linha de Guimarães (a 10 min a pé)' },
    { id: 3, tipo: 'carro', coords: [41.3810, -8.3350], titulo: '🚗 Parque Principal', desc: 'Estacionamento recomendado' },
    { id: 4, tipo: 'carro', coords: [41.3845, -8.3365], titulo: '🚗 Parque Alternativo', desc: 'Ideal para os dias de maior enchente' },
    { id: 5, tipo: 'autocarro', coords: [41.3825, -8.3320], titulo: '🚌 Paragem Central', desc: 'Autocarros urbanos e regionais' },
];

// ------------------------------------------------------------------------
// NOVO: Componente invisível que ajusta a "Câmara" do mapa automaticamente
// ------------------------------------------------------------------------
function ControloDeCamera({ marcadores }: { marcadores: typeof locais }) {
    const mapa = useMap();

    useEffect(() => {
        if (marcadores.length > 0) {
            // Cria uma "caixa" imaginária que engloba todos os pinos visíveis
            const limites = L.latLngBounds(marcadores.map(m => m.coords as [number, number]));
            
            // Manda o mapa voar para essa caixa, dando um espaçamento de 50px (padding) 
            // e um limite de zoom para não aproximar demasiado se houver só 1 pino
            mapa.flyToBounds(limites, { padding: [50, 50], maxZoom: 16, duration: 1.5 });
        }
    }, [marcadores, mapa]);

    return null; // Não desenha nada no ecrã, só controla o mapa
}

export default function MapaMoreira({ categoriaAtiva }: { categoriaAtiva: string }) {
    const centroMoreira: [number, number] = [41.3833, -8.3333];

    // Filtramos os marcadores consoante o botão clicado na página principal
    const marcadoresVisiveis = locais.filter(
        local => local.tipo === 'festa' || categoriaAtiva === 'todos' || local.tipo === categoriaAtiva
    );

    return (
        <MapContainer 
            center={centroMoreira} 
            zoom={15} 
            scrollWheelZoom={false} 
            className="w-full h-full z-0"
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {/* INJETAMOS A CÂMARA AUTOMÁTICA AQUI */}
            <ControloDeCamera marcadores={marcadoresVisiveis} />
            
            {marcadoresVisiveis.map((local) => (
                <Marker key={local.id} position={local.coords as [number, number]} icon={iconePadrao}>
                    <Popup>
                        <div className="text-center">
                            <div className={`font-bold ${local.tipo === 'festa' ? 'text-pink-600 text-base' : 'text-gray-900'}`}>
                                {local.titulo}
                            </div>
                            <div className="text-gray-600 text-xs mt-1">{local.desc}</div>
                        </div>
                    </Popup>
                </Marker>
            ))}

        </MapContainer>
    );
}