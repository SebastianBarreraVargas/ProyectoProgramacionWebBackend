// import-db.ts
import mongoose from 'mongoose';
import fs from 'fs';
import dotenv from 'dotenv';
// Cargar variables de entorno
dotenv.config();
// Importar modelos
import User from '../models/User';
import Role from '../models/Role';
import Question from '../models/Question';
import QuestionType from '../models/QuestionType';
import QuestionAgeClassification from '../models/QuestionAgeClassification';
import AgeClassification from '../models/AgeClassification';
import Subject from '../models/Subject';
import Area from '../models/Area';

const IMPORT_FILE = './database-export.json';

interface DatabaseExport {
    users?: unknown[];
    roles?: unknown[];
    questions?: unknown[];
    questionTypes?: unknown[];
    questionAgeClassifications?: unknown[];
    ageClassifications?: unknown[];
    subjects?: unknown[];
    areas?: unknown[];
}

// ========================================
// FUNCIÓN PARA ELIMINAR ÍNDICES PROBLEMÁTICOS
// ========================================
async function dropProblematicIndexes() {
    try {
        const areaCollection = mongoose.connection.collection('areas');
        
        // Obtener todos los índices
        const indexes = await areaCollection.indexes();
        
        // Buscar y eliminar el índice id_materia_1 si existe
        const problematicIndex = indexes.find(idx => idx.name === 'id_materia_1');
        
        if (problematicIndex) {
            await areaCollection.dropIndex('id_materia_1');
            console.log('    ✓ Índice problemático "id_materia_1" eliminado');
        }
    } catch (error) {
        // Si el índice no existe, ignorar el error
        if ((error as any).code !== 27) { // 27 = IndexNotFound
            console.log('    ℹ️  No se encontró el índice problemático (esto es normal)');
        }
    }
}

// ========================================
// DATOS ADICIONALES COHERENTES
// ========================================
function getPredefinedRoles() {
    return [
        { 
            _id: new mongoose.Types.ObjectId('691bdd83122def7416037e23'),
            role_name: 'student', 
            role_description: 'He answers the teacher\'s questions.' 
        },
        { 
            _id: new mongoose.Types.ObjectId('693170ff90f140f63829c7d3'),
            role_name: 'teacher', 
            role_description: 'He creates tests and exams for students' 
        },
        { 
            _id: new mongoose.Types.ObjectId('693a93bb5aaeea906e3597f5'),
            role_name: 'admin', 
            role_description: 'He is the admin.' 
        }
    ];
}

function getAdditionalSubjects() {
    return [
        { materia_name: 'Física', materia_description: 'Ciencia que estudia las propiedades de la materia y la energía', materia_acronym: 'FIS' },
        { materia_name: 'Química', materia_description: 'Ciencia que estudia la composición y propiedades de la materia', materia_acronym: 'QUIM' },
        { materia_name: 'Biología', materia_description: 'Ciencia que estudia los seres vivos', materia_acronym: 'BIO' },
        { materia_name: 'Historia', materia_description: 'Estudio de los acontecimientos del pasado', materia_acronym: 'HIST' },
        { materia_name: 'Geografía', materia_description: 'Ciencia que estudia la superficie terrestre', materia_acronym: 'GEO' },
        { materia_name: 'Literatura', materia_description: 'Arte de la expresión escrita', materia_acronym: 'LIT' },
        { materia_name: 'Inglés', materia_description: 'Idioma inglés', materia_acronym: 'ENG' }
    ];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getAdditionalAreas(subjects: any[]) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const areas: any[] = [];

    subjects.forEach(subject => {
        switch (subject.materia_name) {
            case 'Física':
                areas.push(
                    { area_name: 'Mecánica', area_description: 'Estudio del movimiento y las fuerzas', acronym: 'MEC', id_subject: subject._id },
                    { area_name: 'Termodinámica', area_description: 'Estudio del calor y la energía', acronym: 'TERM', id_subject: subject._id },
                    { area_name: 'Electromagnetismo', area_description: 'Estudio de campos eléctricos y magnéticos', acronym: 'ELEC', id_subject: subject._id }
                );
                break;
            case 'Química':
                areas.push(
                    { area_name: 'Química Orgánica', area_description: 'Estudio de compuestos de carbono', acronym: 'ORG', id_subject: subject._id },
                    { area_name: 'Química Inorgánica', area_description: 'Estudio de compuestos sin carbono', acronym: 'INORG', id_subject: subject._id }
                );
                break;
            case 'Biología':
                areas.push(
                    { area_name: 'Genética', area_description: 'Estudio de la herencia', acronym: 'GEN', id_subject: subject._id },
                    { area_name: 'Ecología', area_description: 'Estudio de los ecosistemas', acronym: 'ECO', id_subject: subject._id },
                    { area_name: 'Anatomía', area_description: 'Estudio de la estructura de los seres vivos', acronym: 'ANAT', id_subject: subject._id }
                );
                break;
            case 'Historia':
                areas.push(
                    { area_name: 'Historia Antigua', area_description: 'Civilizaciones antiguas', acronym: 'ANT', id_subject: subject._id },
                    { area_name: 'Historia Medieval', area_description: 'Edad Media', acronym: 'MED', id_subject: subject._id },
                    { area_name: 'Historia Moderna', area_description: 'Época moderna', acronym: 'MOD', id_subject: subject._id }
                );
                break;
        }
    });

    return areas;
}

function getAdditionalQuestionTypes() {
    return [
        { name_type: 'Verdadero/Falso', description_type: 'Pregunta con respuesta de verdadero o falso' },
        { name_type: 'Respuesta Corta', description_type: 'Pregunta que requiere una respuesta breve' },
        { name_type: 'Ensayo', description_type: 'Pregunta que requiere desarrollo extenso' },
        { name_type: 'Relación de Columnas', description_type: 'Relacionar elementos de dos columnas' },
        { name_type: 'Completar', description_type: 'Completar espacios en blanco' }
    ];
}

function getAdditionalAgeClassifications() {
    return [
        { desc_classification: 'Infantil', starting_age: 3, ending_age: 7 },
        { desc_classification: 'Primaria Básica', starting_age: 8, ending_age: 10 },
        { desc_classification: 'Primaria Avanzada', starting_age: 11, ending_age: 12 },
        { desc_classification: 'Secundaria Básica', starting_age: 13, ending_age: 15 },
        { desc_classification: 'Secundaria Avanzada', starting_age: 16, ending_age: 18 },
        { desc_classification: 'Universidad', starting_age: 18, ending_age: 25 },
        { desc_classification: 'Adultos', starting_age: 25, ending_age: 100 }
    ];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getAdditionalUsers(roles: any[]) {
    const adminRole = roles.find(r => r.role_name?.toLowerCase().includes('admin'));
    const userRole = roles.find(r => r.role_name?.toLowerCase().includes('user') || r.role_name?.toLowerCase().includes('usuario'));
    const teacherRole = roles.find(r => r.role_name?.toLowerCase().includes('teacher') || r.role_name?.toLowerCase().includes('profesor'));

    return [
        { username: 'Ana García', email: 'ana.garcia@test.com', age: 28, handle_name: 'anagarcia28', active: true, id_role: teacherRole?._id || adminRole?._id },
        { username: 'Carlos Pérez', email: 'carlos.perez@test.com', age: 35, handle_name: 'carlosperez', active: true, id_role: teacherRole?._id || adminRole?._id },
        { username: 'María López', email: 'maria.lopez@test.com', age: 22, handle_name: 'marialopez', active: true, id_role: userRole?._id || adminRole?._id },
        { username: 'Juan Rodríguez', email: 'juan.rodriguez@test.com', age: 19, handle_name: 'juanrod', active: true, id_role: userRole?._id || adminRole?._id },
        { username: 'Laura Martínez', email: 'laura.martinez@test.com', age: 31, handle_name: 'lauramtz', active: true, id_role: teacherRole?._id || adminRole?._id },
        { username: 'Pedro Sánchez', email: 'pedro.sanchez@test.com', age: 24, handle_name: 'pedrosanchez', active: true, id_role: userRole?._id || adminRole?._id },
        { username: 'Sofia Torres', email: 'sofia.torres@test.com', age: 20, handle_name: 'sofiatorres', active: true, id_role: userRole?._id || adminRole?._id },
        { username: 'Diego Ramírez', email: 'diego.ramirez@test.com', age: 27, handle_name: 'diegoram', active: false, id_role: userRole?._id || adminRole?._id }
    ];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getAdditionalQuestions(questionTypes: any[]) {
    const multipleChoice = questionTypes.find(qt => qt.name_type?.toLowerCase().includes('múltiple') || qt.name_type?.toLowerCase().includes('multiple'));
    const trueFalse = questionTypes.find(qt => qt.name_type?.toLowerCase().includes('verdadero') || qt.name_type?.toLowerCase().includes('falso'));
    const shortAnswer = questionTypes.find(qt => qt.name_type?.toLowerCase().includes('corta'));

    const defaultType = multipleChoice || trueFalse || shortAnswer || questionTypes[0];

    return [
        { statement: '¿Cuál es la aceleración de la gravedad en la Tierra?', score: 10, status: 'published', id_question_type: defaultType._id, difficulty: 'low' },
        { statement: '¿Qué es la fotosíntesis?', score: 15, status: 'published', id_question_type: defaultType._id, difficulty: 'medium' },
        { statement: 'Explique la teoría de la relatividad de Einstein', score: 50, status: 'draft', id_question_type: defaultType._id, difficulty: 'high' },
        { statement: '¿En qué año comenzó la Segunda Guerra Mundial?', score: 10, status: 'published', id_question_type: defaultType._id, difficulty: 'low' },
        { statement: '¿Cuál es la fórmula química del agua?', score: 5, status: 'published', id_question_type: defaultType._id, difficulty: 'low' },
        { statement: 'Describa el ciclo de Krebs', score: 30, status: 'editing', id_question_type: defaultType._id, difficulty: 'high' },
        { statement: '¿Qué es un ecosistema?', score: 20, status: 'published', id_question_type: defaultType._id, difficulty: 'medium' },
        { statement: 'Compare y contraste la mitosis y la meiosis', score: 40, status: 'published', id_question_type: defaultType._id, difficulty: 'high' },
        { statement: '¿Cuál es la capital de Francia?', score: 5, status: 'published', id_question_type: defaultType._id, difficulty: 'low' },
        { statement: 'Analice las causas de la Revolución Francesa', score: 45, status: 'draft', id_question_type: defaultType._id, difficulty: 'high' }
    ];
}

// ========================================
// FUNCIÓN PRINCIPAL DE IMPORTACIÓN
// ========================================
async function importDatabase(): Promise<void> {
    try {
        // Verificar variables de entorno
        const mongoUri = process.env.MONGO_URI;
        const dbName = process.env.DB_NAME;

        if (!mongoUri || !dbName) {
            console.error('❌ Error: Variables de entorno MONGO_URI y DB_NAME son requeridas');
            process.exit(1);
        }

        // Verificar que el archivo existe
        if (!fs.existsSync(IMPORT_FILE)) {
            console.error(`❌ Error: No se encontró el archivo ${IMPORT_FILE}`);
            console.log('💡 Ejecutando solo con datos predefinidos...');
        }

        // Conectar a MongoDB
        console.log('🔌 Conectando a MongoDB...');
        await mongoose.connect(mongoUri + dbName);
        console.log('✅ Conectado a MongoDB');

        // Leer el archivo si existe
        let data: DatabaseExport = {};
        if (fs.existsSync(IMPORT_FILE)) {
            console.log(`\n📖 Leyendo archivo ${IMPORT_FILE}...`);
            data = JSON.parse(fs.readFileSync(IMPORT_FILE, 'utf8'));
        }

        console.log('\n📥 Importando y poblando colecciones...\n');

        // ========================================
        // 1. ROLES (SIEMPRE CREAR LOS PREDEFINIDOS)
        // ========================================
        console.log('  → Importando Roles...');
        await Role.deleteMany({});
        
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let allRoles: any[] = [];
        
        // Agregar roles predefinidos (student, teacher, admin)
        allRoles.push(...getPredefinedRoles());
        
        // Agregar roles adicionales del archivo si existen
        if (data.roles && data.roles.length > 0) {
            // Filtrar roles del archivo que no sean los predefinidos
            const predefinedNames = ['student', 'teacher', 'admin'];
            const additionalRoles = (data.roles as any[]).filter(
                role => !predefinedNames.includes((role as any).role_name?.toLowerCase())
            );
            allRoles.push(...additionalRoles);
        }
        
        const roles = await Role.insertMany(allRoles);
        console.log(`    ✓ ${roles.length} roles importados (3 predefinidos + ${roles.length - 3} adicionales)`);

        // ========================================
        // 2. SUBJECTS (DATOS ORIGINALES + ADICIONALES)
        // ========================================
        console.log('  → Importando Subjects...');
        await Subject.deleteMany({});

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let allSubjects: any[] = [];
        if (data.subjects && data.subjects.length > 0) {
            allSubjects = [...data.subjects];
        }
        allSubjects.push(...getAdditionalSubjects());

        const subjects = await Subject.insertMany(allSubjects);
        console.log(`    ✓ ${subjects.length} materias importadas (${data.subjects?.length || 0} originales + ${allSubjects.length - (data.subjects?.length || 0)} adicionales)`);

        // ========================================
        // 3. AREAS (DATOS ORIGINALES + ADICIONALES)
        // ========================================
        console.log('  → Importando Areas...');
        
        // PRIMERO: Eliminar índices problemáticos
        await dropProblematicIndexes();
        
        // SEGUNDO: Limpiar la colección
        await Area.deleteMany({});

        // TERCERO: Insertar los datos
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let allAreas: any[] = [];
        if (data.areas && data.areas.length > 0) {
            allAreas = [...data.areas];
        }
        allAreas.push(...getAdditionalAreas(subjects));

        const areas = await Area.insertMany(allAreas);
        console.log(`    ✓ ${areas.length} áreas importadas (${data.areas?.length || 0} originales + ${allAreas.length - (data.areas?.length || 0)} adicionales)`);

        // ========================================
        // 4. AGE CLASSIFICATIONS (DATOS ORIGINALES + ADICIONALES)
        // ========================================
        console.log('  → Importando AgeClassifications...');
        await AgeClassification.deleteMany({});

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let allAgeClassifications: any[] = [];
        if (data.ageClassifications && data.ageClassifications.length > 0) {
            allAgeClassifications = [...data.ageClassifications];
        }
        allAgeClassifications.push(...getAdditionalAgeClassifications());

        const ageClassifications = await AgeClassification.insertMany(allAgeClassifications);
        console.log(`    ✓ ${ageClassifications.length} clasificaciones de edad importadas (${data.ageClassifications?.length || 0} originales + ${allAgeClassifications.length - (data.ageClassifications?.length || 0)} adicionales)`);

        // ========================================
        // 5. QUESTION TYPES (DATOS ORIGINALES + ADICIONALES)
        // ========================================
        console.log('  → Importando QuestionTypes...');
        await QuestionType.deleteMany({});

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let allQuestionTypes: any[] = [];
        if (data.questionTypes && data.questionTypes.length > 0) {
            allQuestionTypes = [...data.questionTypes];
        }
        allQuestionTypes.push(...getAdditionalQuestionTypes());

        const questionTypes = await QuestionType.insertMany(allQuestionTypes);
        console.log(`    ✓ ${questionTypes.length} tipos de pregunta importados (${data.questionTypes?.length || 0} originales + ${allQuestionTypes.length - (data.questionTypes?.length || 0)} adicionales)`);

        // ========================================
        // 6. USERS (DATOS ORIGINALES + ADICIONALES)
        // ========================================
        console.log('  → Importando Users...');
        await User.deleteMany({});

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let allUsers: any[] = [];
        if (data.users && data.users.length > 0) {
            allUsers = [...data.users];
        }
        allUsers.push(...getAdditionalUsers(roles));

        const users = await User.insertMany(allUsers);
        console.log(`    ✓ ${users.length} usuarios importados (${data.users?.length || 0} originales + ${allUsers.length - (data.users?.length || 0)} adicionales)`);

        // ========================================
        // 7. QUESTIONS (DATOS ORIGINALES + ADICIONALES)
        // ========================================
        console.log('  → Importando Questions...');
        await Question.deleteMany({});

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let allQuestions: any[] = [];
        if (data.questions && data.questions.length > 0) {
            allQuestions = [...data.questions];
        }
        allQuestions.push(...getAdditionalQuestions(questionTypes));

        const questions = await Question.insertMany(allQuestions);
        console.log(`    ✓ ${questions.length} preguntas importadas (${data.questions?.length || 0} originales + ${allQuestions.length - (data.questions?.length || 0)} adicionales)`);

        // ========================================
        // 8. QUESTION AGE CLASSIFICATIONS
        // ========================================
        console.log('  → Importando QuestionAgeClassifications...');
        await QuestionAgeClassification.deleteMany({});

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let allQAC: any[] = [];
        if (data.questionAgeClassifications && data.questionAgeClassifications.length > 0) {
            allQAC = [...data.questionAgeClassifications];
        }

        // Crear relaciones automáticas para las nuevas preguntas
        const newQuestions = questions.slice(data.questions?.length || 0);
        newQuestions.forEach(question => {
            // Asignar clasificaciones de edad apropiadas según la dificultad
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            let appropriateAges: any[] = [];
            switch (question.difficulty) {
                case 'low':
                    appropriateAges = ageClassifications.filter(ac => ac.starting_age >= 8 && ac.starting_age <= 12);
                    break;
                case 'medium':
                    appropriateAges = ageClassifications.filter(ac => ac.starting_age >= 13 && ac.starting_age <= 18);
                    break;
                case 'high':
                    appropriateAges = ageClassifications.filter(ac => ac.starting_age >= 16);
                    break;
            }

            appropriateAges.forEach(ageClass => {
                allQAC.push({
                    id_question: question._id,
                    id_age_classification: ageClass._id
                });
            });
        });

        if (allQAC.length > 0) {
            const qac = await QuestionAgeClassification.insertMany(allQAC);
            console.log(`    ✓ ${qac.length} clasificaciones de pregunta-edad importadas`);
        }

        console.log('\n✅ Base de datos poblada exitosamente con datos originales y adicionales!');
        console.log('\n📊 RESUMEN:');
        console.log(`   - Roles: ${roles.length}`);
        console.log(`   - Materias: ${subjects.length}`);
        console.log(`   - Áreas: ${areas.length}`);
        console.log(`   - Clasificaciones de Edad: ${ageClassifications.length}`);
        console.log(`   - Tipos de Pregunta: ${questionTypes.length}`);
        console.log(`   - Usuarios: ${users.length}`);
        console.log(`   - Preguntas: ${questions.length}`);
        console.log(`   - Relaciones Pregunta-Edad: ${allQAC.length}`);

    } catch (error) {
        console.error('❌ Error al importar la base de datos:', error);
        process.exit(1);
    } finally {
        await mongoose.connection.close();
        console.log('\n🔌 Conexión cerrada');
    }
}

importDatabase();