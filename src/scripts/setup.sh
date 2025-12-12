#!/bin/bash

echo "==========================================================================================="
echo "           CONFIGURACIÓN AUTOMÁTICA - Proyecto Programación Web Backend"
echo "==========================================================================================="
echo ""

# Verificar que estamos en el directorio raíz del proyecto
if [ ! -f "package.json" ]; then
    echo "❌ Error: Este script debe ejecutarse desde la raíz del proyecto"
    exit 1
fi

echo "🔧 Iniciando configuración automática..."
echo ""

# ========================================
# 1. CONFIGURAR ARCHIVO .ENV
# ========================================
if [ ! -f .env ]; then
    echo "📝 Creando archivo .env..."
    cp .env.example .env
    echo "✅ Archivo .env creado"
    echo ""
    echo "⚠️  IMPORTANTE: Debes editar el archivo .env con tus credenciales:"
    echo "   - MONGO_URI: Tu URI de conexión a MongoDB Atlas"
    echo "   - DB_NAME: Nombre de tu base de datos"
    echo "   - SECRET: Genera uno con: node -e \"console.log(require('crypto').randomBytes(64).toString('hex'))\""
    echo ""
else
    echo "ℹ️  El archivo .env ya existe, omitiendo..."
    echo ""
fi

# ========================================
# 2. GENERAR CERTIFICADOS SSL
# ========================================
if [ ! -f localhost.pem ] || [ ! -f localhost-key.pem ]; then
    echo "🔐 Generando certificados SSL..."
    
    # Verificar si mkcert está instalado
    if ! command -v mkcert &> /dev/null; then
        echo "❌ Error: mkcert no está instalado"
        echo "💡 Instálalo con:"
        echo "   - macOS/Linux: brew install mkcert"
        echo "   - Windows: choco install mkcert"
        exit 1
    fi
    
    # Instalar CA local
    mkcert -install
    
    # Generar certificados
    mkcert localhost
    
    echo "✅ Certificados SSL generados exitosamente"
    echo ""
else
    echo "ℹ️  Los certificados SSL ya existen, omitiendo..."
    echo ""
fi

# ========================================
# 3. INSTALAR DEPENDENCIAS
# ========================================
echo "📦 ¿Deseas instalar las dependencias del proyecto ahora? (s/n)"
read -r install_deps

if [ "$install_deps" = "s" ] || [ "$install_deps" = "S" ]; then
    echo "📦 Instalando dependencias..."
    npm install
    echo "✅ Dependencias instaladas"
    echo ""
else
    echo "⏭️  Instalación de dependencias omitida"
    echo "💡 Recuerda ejecutar 'npm install' antes de iniciar el servidor"
    echo ""
fi

# ========================================
# 4. POBLAR BASE DE DATOS (OPCIONAL)
# ========================================
echo "📊 ¿Deseas poblar la base de datos con datos de ejemplo? (s/n)"
read -r populate_db

if [ "$populate_db" = "s" ] || [ "$populate_db" = "S" ]; then
    echo "⚠️  Asegúrate de haber configurado correctamente MONGO_URI y DB_NAME en .env"
    echo "¿Continuar con la población de datos? (s/n)"
    read -r confirm_populate
    
    if [ "$confirm_populate" = "s" ] || [ "$confirm_populate" = "S" ]; then
        echo "📥 Poblando base de datos..."
        npx ts-node src/scripts/import-db.ts
        echo ""
    else
        echo "⏭️  Población de base de datos cancelada"
        echo ""
    fi
else
    echo "⏭️  Población de base de datos omitida"
    echo ""
fi

echo "==========================================================================================="
echo "✨ ¡Configuración completa!"
echo "==========================================================================================="
echo ""
echo "📋 PRÓXIMOS PASOS:"
echo ""
if [ ! -f .env ]; then
    echo "1. Edita el archivo .env con tus credenciales"
fi
if [ "$install_deps" != "s" ] && [ "$install_deps" != "S" ]; then
    echo "2. Ejecuta: npm install"
fi
echo "3. Inicia el servidor: npm run dev"
echo ""
echo "==========================================================================================="
