import * as XLSX from 'xlsx';
import fs from "fs";
import path from "path";

export interface DeviceResponse {
  devices: Device[];
  metadata: Metadata;
}

export interface Device {
  model: string;
  brand: string;
  SO: string;
  status: string;
  createdAt: string;
}

export interface Metadata {
  totalDevices: number;
  lastUpdated: string;
}

function transformDevices(devices: Device[]): DeviceResponse {
  return {
    devices: devices,
    metadata: {
      totalDevices: devices.length,
      lastUpdated: new Date().toISOString(),
    },
  };
}

// Cargar el archivo Excel
//data.xlsx
//const filePath = path.join(__dirname, "files/data.xlsx");
// dispositivos_iO.csv
const filePath = path.join(__dirname, "../src/files/dispositivos_iO.csv");
const workbook = XLSX.readFile(filePath);

// Obtener la primera hoja del Excel
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];

// Convertir la hoja a JSON
const data = XLSX.utils.sheet_to_json(sheet);
console.log(data);

const devices: Device[] = data.map(device => {
  const item: Device = {
    model: String(device['MODELO']),
    brand: String(device['MARCA']),
    SO: String(device['VERS_SISTEMA']),
    status: 'approved',
    createdAt: new Date().toISOString(),
  }
  return item;
});

console.log(JSON.stringify(transformDevices(devices), null, 2));

const devicesJson = transformDevices(devices);

const jsonFilePath = path.join(__dirname, "../src/files/user_devices_status.json");


fs.writeFileSync(jsonFilePath, JSON.stringify(devicesJson, null, 2), "utf8");
