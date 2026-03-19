const mysql = require('mysql2/promise');

async function migrate() {
  const db = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'campus_portal'
  });

  try {
    // Add mfa_enabled with error handling
    try {
      await db.execute("ALTER TABLE users ADD COLUMN mfa_enabled TINYINT(1) DEFAULT 0");
      console.log('✓ Added mfa_enabled column');
    } catch (e1) {
      if (e1.code === 'ER_DUP_FIELDNAME') {
        console.log('ℹ mfa_enabled already exists');
      } else {
        throw e1;
      }
    }
    
    // Add mfa_secret with error handling
    try {
      await db.execute("ALTER TABLE users ADD COLUMN mfa_secret VARCHAR(255) DEFAULT NULL");
      console.log('✓ Added mfa_secret column');
    } catch (e2) {
      if (e2.code === 'ER_DUP_FIELDNAME') {
        console.log('ℹ mfa_secret already exists');
      } else {
        throw e2;
      }
    }
    
    // Verify
    const [rows] = await db.execute("DESCRIBE users WHERE Field LIKE '%mfa%'");
    if (rows.length === 2) {
      console.log('Migration successful! MFA columns verified:');
      rows.forEach(r => console.log(`${r.Field}: ${r.Type} (Default: ${r['Default'] || 'NULL'})`));
      console.log('\n✅ Database ready for MFA!');
    } else {
      console.log('Partial migration. Columns:', rows.map(r => r.Field).join(', ') || 'none');
    }
  } catch (err) {
    console.error('Migration failed:', err.message);
    process.exit(1);
  } finally {
    await db.end();
  }
}

migrate().catch(console.error);

