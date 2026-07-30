import { MapContainer, TileLayer, Marker, Popup, Polyline, Polygon, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useMemo } from 'react';

// ============================================================================
// 1. DADOS DOS PARQUES (CARROS)
// ============================================================================
const parque1 = [ [41.381110154602666, -8.338244046195298], [41.380993285879455, -8.338281004622342], [41.38019192811636, -8.338053598617138], [41.38011611361426, -8.338049889350874], [41.38002875064911, -8.338018796490587], [41.38008960473439, -8.338007749588918], [41.38037957124056, -8.338045359827584], [41.380663179006916, -8.338126175960868], [41.38111317331848, -8.338242231338825] ];
const parque2 = [ [41.38158531729852, -8.337394869191446], [41.38160106977183, -8.33740600501352], [41.3819014908303, -8.336555897702182], [41.3818947336194, -8.336525464575836] ];
const parque3 = [ [41.38238234373435, -8.335074260529854], [41.38237456626297, -8.335045740122574], [41.382553709653166, -8.334654181628855], [41.38254152819798, -8.334642796462902] ];
const parque4 = [ [41.38145527109861, -8.337968706910514], [41.38151386562248, -8.337719561658206], [41.38149730702335, -8.337712462060686], [41.381430259493946, -8.337966094114257] ];
const parque5 = [ [41.3815288431333, -8.33859348583853], [41.38154123843641, -8.338568608260944], [41.381894556172, -8.338953747488405], [41.38188366086437, -8.338978622805259] ];
const parque6Cemiterio = [ [41.3829296, -8.3357752], [41.3830552, -8.3355572], [41.382874, -8.3353103], [41.3828359, -8.3353085], [41.3826416, -8.3355488], [41.3829296, -8.3357752] ];

// ============================================================================
// 2. DADOS DAS ROTAS (CARROS)
// ============================================================================
const rotaGuimaraes = [ [41.399905, -8.3230989], [41.397707, -8.3250735], [41.3959518, -8.3267898], [41.3947077, -8.3286539], [41.3926678, -8.3318166], [41.3907533, -8.3347735], [41.3887474, -8.3378083], [41.3873821, -8.3399368], [41.3856507, -8.3384069], [41.385179, -8.3380212], [41.3850102, -8.3379891], [41.3842144, -8.3391269], [41.3840728, -8.3392146], [41.3838359, -8.3392936], [41.383754, -8.3393098], [41.3833602, -8.3392541], [41.381978, -8.3389591], [41.3815922, -8.3385892] ];
const rotaVizela = [ [41.3760985, -8.3117269], [41.3757584, -8.3133167], [41.3754709, -8.3142935], [41.3753655, -8.3151299], [41.3753751, -8.316011], [41.3756338, -8.3179775], [41.3757409, -8.3182911], [41.3759374, -8.3184763], [41.3774685, -8.3190357], [41.3783139, -8.3193775], [41.3795548, -8.3204583], [41.3796985, -8.3210074], [41.3796696, -8.3218184], [41.3797271, -8.3222142], [41.3798852, -8.3229102], [41.3798804, -8.3232805], [41.3796984, -8.324053], [41.379569, -8.3246021], [41.379502, -8.3265494], [41.3793819, -8.3269092], [41.3790418, -8.3273816], [41.3789364, -8.3284415], [41.3790384, -8.3287344], [41.3793658, -8.3292594], [41.37955, -8.3295825], [41.3796472, -8.3308779], [41.3796472, -8.3312086], [41.3798058, -8.3315801], [41.3802022, -8.3321528], [41.3804919, -8.3322666], [41.380655, -8.3322567], [41.3810779, -8.3320576], [41.3813454, -8.3319449], [41.3815597, -8.3319448], [41.3820909, -8.3320747], [41.3822324, -8.3321189], [41.3824809, -8.3325718], [41.3828751, -8.3337686], [41.3828914, -8.3339821], [41.3828165, -8.33424], [41.3822306, -8.3354835], [41.3815291, -8.3374882], [41.381351, -8.3380846] ];
const rotaLordeloSantoTirso = [ [41.3812225, -8.3381986], [41.3809958, -8.3381819], [41.3806343, -8.3380955], [41.3801597, -8.3379862], [41.3799212, -8.3380146], [41.379367, -8.338213], [41.3787653, -8.3384313], [41.3781657, -8.3387316], [41.3775004, -8.339264], [41.3774035, -8.339486], [41.3773742, -8.3397228], [41.3773912, -8.3403038], [41.377421, -8.3411736], [41.3774543, -8.3420168], [41.3774499, -8.3423644], [41.3774146, -8.3424895], [41.3773087, -8.3426384], [41.3770414, -8.3428624], [41.3767508, -8.3432501], [41.3761255, -8.344073], [41.3760105, -8.3442261], [41.3756015, -8.3450578], [41.375326, -8.3457407], [41.3752297, -8.3459067], [41.3751126, -8.3461882], [41.3750536, -8.3469695], [41.3750042, -8.3472771], [41.3746456, -8.3479299], [41.374368, -8.3483387], [41.3740852, -8.3487774], [41.3738111, -8.3489836], [41.3732395, -8.3494112], [41.3731323, -8.3495102], [41.3729552, -8.3499357], [41.3726836, -8.3508496], [41.3726315, -8.3511152], [41.3725734, -8.3515558], [41.3724308, -8.3518482], [41.3721911, -8.3520629], [41.3717201, -8.3523559], [41.3711371, -8.3527213], [41.3708987, -8.3528769], [41.3706855, -8.3531343], [41.3702955, -8.3537298], [41.3700119, -8.3540979], [41.3693165, -8.3542238], [41.3690533, -8.3543563], [41.3685775, -8.3548674], [41.3684441, -8.3550318], [41.3683382, -8.3553474], [41.3683103, -8.3556355], [41.3684776, -8.3560824], [41.3687464, -8.3563587], [41.3695644, -8.3567883], [41.3702246, -8.3569449], [41.3703665, -8.3569989], [41.3709483, -8.357708], [41.3716127, -8.35774], [41.3720734, -8.3578008], [41.3727334, -8.3581206], [41.3735576, -8.3582578], [41.3737123, -8.358299] ];
const rotaLordeloAves = [ [41.373731, -8.3583765], [41.3726548, -8.3594314], [41.3720838, -8.3599545], [41.3719483, -8.3601802], [41.3718634, -8.3604756], [41.3718836, -8.3608561], [41.3719298, -8.3610853], [41.3721642, -8.3613692], [41.3725707, -8.3616459], [41.3732508, -8.3617467], [41.3735151, -8.3619507], [41.3736553, -8.3622077], [41.3737432, -8.362629], [41.373635, -8.3633767], [41.3734687, -8.3636479], [41.3732469, -8.3638056], [41.3727803, -8.3640025], [41.3724057, -8.3643266], [41.3723265, -8.3647815], [41.372711, -8.3656613] ];
const rotaSaoMartinho = [ [41.3683999, -8.3559326], [41.3681546, -8.3561245], [41.367973, -8.3561895], [41.3677818, -8.3561009], [41.3676561, -8.3558247], [41.3676057, -8.3553681], [41.3675749, -8.3552499], [41.3674761, -8.3551522], [41.3672875, -8.3551147], [41.3671322, -8.3551151], [41.3669399, -8.3552399], [41.3667463, -8.3553771], [41.366254, -8.3547742] ];

// ============================================================================
// COMPONENTE DO MAPA
// ============================================================================
export default function MapaMoreiraViagem({ 
    categoriaAtiva, 
    filtrosAtivos = [] 
}: { 
    categoriaAtiva: string, 
    filtrosAtivos?: string[] 
}) {
    const centroMoreira = [41.381, -8.337]; 

    const estiloParque = { 
        color: '#b45309', 
        fillColor: '#f59e0b', 
        fillOpacity: 0.6,
        weight: 2
    };

    const iconeParque = useMemo(() => {
        if (typeof window === 'undefined') return null;
        return L.divIcon({
            className: 'custom-icon-parque',
            html: `<div style="background-color: #2563eb; color: white; border-radius: 8px; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 18px; border: 2px solid white; box-shadow: 0 4px 6px rgba(0,0,0,0.3);">P</div>`,
            iconSize: [32, 32], iconAnchor: [16, 32], popupAnchor: [0, -32]
        });
    }, []);

    return (
        <MapContainer center={centroMoreira as [number, number]} zoom={16} scrollWheelZoom={true} className="w-full h-full z-0">
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* MARCADORES E ÁREAS DE PARQUE */}
            {categoriaAtiva === 'carro' && iconeParque && filtrosAtivos.includes('parques') && (
                <>
                    <Polygon positions={parque1 as [number, number][]} pathOptions={estiloParque}>
                        <Tooltip sticky className="font-bold text-amber-700">Parque Oficial 1</Tooltip>
                    </Polygon>
                    <Marker position={[41.3805, -8.3381]} icon={iconeParque}>
                        <Popup className="font-bold">Entrada do Parque 1</Popup>
                    </Marker>

                    <Polygon positions={parque2 as [number, number][]} pathOptions={estiloParque}>
                        <Tooltip sticky className="font-bold text-amber-700">Parque Oficial 2</Tooltip>
                    </Polygon>
                    <Marker position={[41.3817, -8.3369]} icon={iconeParque}>
                        <Popup className="font-bold">Entrada do Parque 2</Popup>
                    </Marker>

                    <Polygon positions={parque3 as [number, number][]} pathOptions={estiloParque}>
                        <Tooltip sticky className="font-bold text-amber-700">Parque Oficial 3</Tooltip>
                    </Polygon>
                    <Marker position={[41.3824, -8.3348]} icon={iconeParque}>
                        <Popup className="font-bold">Entrada do Parque 3</Popup>
                    </Marker>

                    <Polygon positions={parque4 as [number, number][]} pathOptions={estiloParque}>
                        <Tooltip sticky className="font-bold text-amber-700">Parque Oficial 4</Tooltip>
                    </Polygon>
                    <Marker position={[41.3814, -8.3378]} icon={iconeParque}>
                        <Popup className="font-bold">Entrada do Parque 4</Popup>
                    </Marker>

                    <Polygon positions={parque5 as [number, number][]} pathOptions={estiloParque}>
                        <Tooltip sticky className="font-bold text-amber-700">Parque Oficial 5</Tooltip>
                    </Polygon>
                    <Marker position={[41.3817, -8.3387]} icon={iconeParque}>
                        <Popup className="font-bold">Entrada do Parque 5</Popup>
                    </Marker>

                    <Polygon positions={parque6Cemiterio as [number, number][]} pathOptions={estiloParque}>
                        <Tooltip sticky className="font-bold text-amber-700">Parque do Cemitério</Tooltip>
                    </Polygon>
                    <Marker position={[41.3828, -8.3355]} icon={iconeParque}>
                        <Popup className="font-bold">Entrada do Parque do Cemitério</Popup>
                    </Marker>
                </>
            )}

            {/* ROTAS */}
            {categoriaAtiva === 'carro' && (
                <>
                    {filtrosAtivos.includes('rotaGuimaraes') && (
                        <Polyline positions={rotaGuimaraes as [number, number][]} color="#3b82f6" weight={5} opacity={0.8}>
                            <Tooltip sticky className="font-bold text-blue-600">Ligação Guimarães</Tooltip>
                        </Polyline>
                    )}
                    {filtrosAtivos.includes('rotaVizela') && (
                        <Polyline positions={rotaVizela as [number, number][]} color="#8b5cf6" weight={5} opacity={0.8}>
                            <Tooltip sticky className="font-bold text-purple-600">Ligação Vizela</Tooltip>
                        </Polyline>
                    )}
                    
                    {/* O NOVO AGRUPAMENTO DO CORREDOR SUL */}
                    {filtrosAtivos.includes('rotasSul') && (
                        <>
                            {/* Mesma cor e tooltip "Lordelo" para as ramificações de Lordelo e Aves */}
                            <Polyline positions={rotaLordeloSantoTirso as [number, number][]} color="#10b981" weight={5} opacity={0.8}>
                                <Tooltip sticky className="font-bold text-emerald-600">Ligação Moreira - Lordelo</Tooltip>
                            </Polyline>
                            <Polyline positions={rotaLordeloAves as [number, number][]} color="#10b981" weight={5} opacity={0.8}>
                                <Tooltip sticky className="font-bold text-emerald-600">Ligação Moreira - Lordelo / Vila das Aves</Tooltip>
                            </Polyline>
                            
                            {/* Cor distinta para S. Martinho, mas gerida pelo mesmo filtro */}
                            <Polyline positions={rotaSaoMartinho as [number, number][]} color="#14b8a6" weight={5} opacity={0.8}>
                                <Tooltip sticky className="font-bold text-teal-600">Ligação Moreira - S. Martinho do Campo (Vila do Campo)</Tooltip>
                            </Polyline>
                        </>
                    )}
                </>
            )}
        </MapContainer>
    );
}