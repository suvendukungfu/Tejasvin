const { execSync } = require('child_process');
const fs = require('fs');

const versionType = process.argv[2] || 'patch';

try {
  console.log('🚀 Starting release process...');
  
  // 1. Run build and tests
  console.log('📦 Building project...');
  execSync('npm run build:all', { stdio: 'inherit' });

  // 2. Bump version
  console.log(`🔢 Bumping version (${versionType})...`);
  execSync(`npm version ${versionType} --no-git-tag-version`, { stdio: 'inherit' });

  const newVersion = require('../package.json').version;

  // 3. Update backend/frontend versions
  ['backend', 'frontend'].forEach(dir => {
    const pkgPath = `${dir}/package.json`;
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    pkg.version = newVersion;
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
    console.log(`✅ Updated ${dir} to v${newVersion}`);
  });

  // 4. Git operations
  console.log('💾 Committing and tagging...');
  execSync('git add .');
  execSync(`git commit -m "chore(release): v${newVersion}"`);
  execSync(`git tag -a v${newVersion} -m "Release v${newVersion}"`);

  console.log(`✨ Successfully released v${newVersion}!`);
  console.log('👉 Run "git push origin --tags" to deploy.');
} catch (err) {
  console.error('❌ Release failed:', err.message);
  process.exit(1);
}
