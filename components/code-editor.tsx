"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export function CodeEditor() {
  const [currentLevel, setCurrentLevel] = useState(1)
  const [level3Code, setLevel3Code] = useState(`int botonPin = 7;  // Pin del botón
int motorPin = 9;  // Pin del motor
int estadoBoton = 0;

void setup() {
  pinMode(botonPin, INPUT);  // Establece el botón como entrada
  pinMode(motorPin, OUTPUT); // Establece el motor como salida
}

void loop() {
  estadoBoton = digitalRead(botonPin);  // Lee el estado del botón

  if (estadoBoton == HIGH) {
    digitalWrite(motorPin, HIGH);  // Enciende el motor
  } else {
    digitalWrite(motorPin, LOW);   // Apaga el motor
  }
}`)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const levelCode = {
    1: `void setup() {
  pinMode(13, OUTPUT);  // Establece el pin 13 como salida
}

void loop() {
  digitalWrite(13, HIGH);  // Enciende el LED
  delay(1000);              // Espera 1 segundo
  digitalWrite(13, LOW);   // Apaga el LED
  delay(1000);              // Espera 1 segundo
}`,
    2: `int sensorPin = A0;  // Pin analógico donde está conectado el LM35
float temperatura = 0.0;

void setup() {
  Serial.begin(9600);  // Inicia la comunicación serial
}

void loop() {
  int valor = analogRead(sensorPin);    // Lee el valor del sensor
  temperatura = (valor * 5.0 * 100.0) / 1024.0;  // Convierte a grados Celsius
  Serial.print("Temperatura: ");
  Serial.print(temperatura);
  Serial.println(" C");
  delay(1000);  // Espera 1 segundo
}`
  }

  const handleFileOpen = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const contents = e.target?.result as string;
        setLevel3Code(contents);
      };
      reader.onerror = (e) => {
        console.error('Error reading file:', e.target?.error);
        alert('Failed to read the file. Please try again.');
      };
      reader.readAsText(file);
    }
  };

  const handleFileSave = () => {
    const blob = new Blob([level3Code], { type: 'text/x-arduino' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sketch.ino';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Select defaultValue="stock">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Stock Code" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="stock">Stock Code</SelectItem>
            <SelectItem value="custom">Custom Code</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="no-device">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Device Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="no-device">No Device Connected</SelectItem>
            <SelectItem value="connected">Connected</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline">Monitor: Off</Button>
      </div>

      <div className="flex gap-2">
        <Button 
          className={`${currentLevel === 1 ? 'bg-orange-600' : 'bg-orange-500'} hover:bg-orange-600`}
          onClick={() => setCurrentLevel(1)}
        >
          LEVEL 1
        </Button>
        <Button 
          className={`${currentLevel === 2 ? 'bg-orange-600' : 'bg-orange-500'} hover:bg-orange-600`}
          onClick={() => setCurrentLevel(2)}
        >
          LEVEL 2
        </Button>
        <Button 
          className={`${currentLevel === 3 ? 'bg-orange-600' : 'bg-orange-500'} hover:bg-orange-600`}
          onClick={() => setCurrentLevel(3)}
        >
          LEVEL 3
        </Button>
        {currentLevel === 3 && (
          <>
            <Button onClick={handleFileOpen}>Import .ino</Button>
            <Button onClick={handleFileSave}>Save .ino</Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileInputChange}
              accept=".ino"
              style={{ display: 'none' }}
            />
          </>
        )}
      </div>

      <div className="relative min-h-[600px] rounded-md border bg-muted p-4 overflow-auto">
        {currentLevel === 3 ? (
          <Textarea
            value={level3Code}
            onChange={(e) => setLevel3Code(e.target.value)}
            className="min-h-[600px] font-mono text-sm bg-transparent border-none resize-none focus-visible:ring-0"
          />
        ) : (
          <pre className="text-sm text-purple-400 font-mono">
            <code>{levelCode[currentLevel as keyof typeof levelCode]}</code>
          </pre>
        )}
      </div>
    </div>
  )
}

