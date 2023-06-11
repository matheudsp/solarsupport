import fs from 'fs';

const copyFiles = async () => {
  try {
    await fs.copyFileSync('./template/template.docx', './public/webviewer/lib');
    console.log('WebViewer files copied over successfully');
  } catch (err) {
    console.error(err);
  }
};


