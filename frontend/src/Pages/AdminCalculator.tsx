import { useState } from "react";
import { Calculator, X } from "lucide-react";

const MATERIAL_DATA = [
    { name: "Ladrillos", unidad: "pieza", baseCantidad: 14500, precio: 0 },
    { name: "Bloques (Colado)", unidad: "pieza", baseCantidad: 1200, precio: 0 },
    { name: "Cemento (bulto 50kg)", unidad: "bulto", baseCantidad: 200, precio: 0 },
    { name: "Varilla 3/4”", unidad: "pieza", baseCantidad: 12, precio: 0 },
    { name: "Varilla 1/2”", unidad: "pieza", baseCantidad: 10, precio: 0 },
    { name: "Varilla 3/8”", unidad: "pieza", baseCantidad: 80, precio: 0 },
    { name: "Armex 3/8”", unidad: "pieza", baseCantidad: 120, precio: 0 },
    { name: "Yeso (bulto 40kg)", unidad: "bulto", baseCantidad: 263, precio: 0 },
    { name: "Colado (m³)", unidad: "m³", baseCantidad: 25, precio: 0 },
    { name: "Grava (m²)", unidad: "m²", baseCantidad: 12, precio: 0 },
    { name: "Arena (m²)", unidad: "m²", baseCantidad: 54, precio: 0 },
    { name: "Pintura Interior", unidad: "cubeta", baseCantidad: 3, precio: 0 },
    { name: "Pintura Exterior", unidad: "cubeta", baseCantidad: 1.25, precio: 0 },
];

export default function AdminCalculator() {
    const [metrosConstruccion, setMetrosConstruccion] = useState(0);
    const [materiales, setMateriales] = useState(MATERIAL_DATA);
    const [showCalc, setShowCalc] = useState(false);
    const [calcValue, setCalcValue] = useState("");

    const handlePrecioChange = (index: number, value: number) => {
        const copia = [...materiales];
        copia[index].precio = value;
        setMateriales(copia);
    };

    const calcularCantidad = (base: number) =>
        (metrosConstruccion * base) / 190;

    const totalPorMaterial = (cantidad: number, precio: number) =>
        (cantidad * precio).toFixed(2);

    const totalGlobal = materiales.reduce((acc, mat) => {
        const cantidad = calcularCantidad(mat.baseCantidad);
        return acc + cantidad * (mat.precio || 0);
    }, 0);

    const handleCalcInput = (val: string) => {
        if (val === "C") return setCalcValue("");
        if (val === "=") {
            try {
                const resultado = eval(calcValue);
                setCalcValue(resultado.toString());
            } catch {
                setCalcValue("Error");
            }
        } else {
            setCalcValue((prev) => prev + val);
        }
    };

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6 max-w-4xl mx-auto">
                <h2 className="text-xl font-bold mb-4 text-gray-800">Calculadora de Materiales</h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Metros cuadrados de construcción</label>
                    <input
                        type="number"
                        value={metrosConstruccion}
                        onChange={(e) => setMetrosConstruccion(Number(e.target.value))}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {materiales.map((mat, idx) => {
                        const cantidad = calcularCantidad(mat.baseCantidad);
                        return (
                            <div key={mat.name} className="border rounded-lg p-4 bg-gray-50">
                                <h4 className="font-semibold text-gray-700 mb-2">{mat.name}</h4>
                                <p className="text-sm text-gray-600 mb-1">
                                    Cantidad estimada: <strong>{cantidad.toFixed(2)} {mat.unidad}</strong>
                                </p>
                                <label className="block text-xs mb-1">Precio por {mat.unidad}:</label>
                                <input
                                    type="number"
                                    className="w-full border border-gray-300 rounded-md px-2 py-1 mb-2"
                                    onChange={(e) => handlePrecioChange(idx, parseFloat(e.target.value))}
                                />
                                <p className="text-sm text-gray-600">
                                    Total: <strong>${totalPorMaterial(cantidad, mat.precio)}</strong>
                                </p>
                            </div>
                        );
                    })}
                </div>

                <div className="text-right mt-6 text-lg font-bold text-gray-800">
                    Total estimado: ${totalGlobal.toFixed(2)}
                </div>
            </div>

            {/* Botón flotante para calculadora tradicional */}
            <div className="fixed bottom-6 right-6 z-50">
                <button
                    className="bg-orange-500 text-white p-3 rounded-full shadow-lg hover:bg-orange-600"
                    onClick={() => setShowCalc(!showCalc)}
                >
                    {showCalc ? <X /> : <Calculator />}
                </button>
            </div>

            {/* Calculadora tradicional flotante */}
            {showCalc && (
                <div className="fixed bottom-20 right-6 w-64 bg-white border shadow-xl rounded-xl p-4 z-50">
                    <h3 className="font-semibold mb-2 text-gray-800">Calculadora</h3>
                    <input
                        className="w-full border rounded mb-3 px-2 py-1 text-right"
                        value={calcValue}
                        readOnly
                    />
                    <div className="grid grid-cols-4 gap-2">
                        {["7", "8", "9", "/",
                            "4", "5", "6", "*",
                            "1", "2", "3", "-",
                            "0", ".", "=", "+"].map((btn) => (
                                <button
                                    key={btn}
                                    onClick={() => handleCalcInput(btn)}
                                    className="bg-gray-200 hover:bg-gray-300 rounded px-2 py-2 text-center text-sm font-bold"
                                >
                                    {btn}
                                </button>
                            ))}
                        <button
                            onClick={() => handleCalcInput("C")}
                            className="col-span-4 bg-red-500 text-white py-2 rounded font-bold"
                        >
                            Limpiar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
