# This script compiles a zip of the source code along with instructions for the Firefox Addon Store

rm -rf ffsource

cp -r extension ffsource
rm -rf ffsource/build
rm -rf ffsource/package
rm -rf ffsource/node_modules

touch ffsource/README

echo "My build environment is as follows:" >> ffsource/README
echo "OS: macOS 15.1" >> ffsource/README
echo "Node: 20.9.0" >> ffsource/README
echo "PNPM: 9.7.0" >> ffsource/README
echo "In theory, you *should* be fine with any OS, any 20.x version of Node, and any somewhat up-to-date version of pnpm thopuh." >> ffsource/README
echo "" >> ffsource/README
echo "Build steps:" >> ffsource/README
echo "1. Run pnpm install" >> ffsource/README
echo "2. Run pnpm build:firefox" >> ffsource/README
echo "3. The built extension will be found at package/asutils-[version]-firefox.zip" >> ffsource/README
echo "   The built source code will be found at build/firefox" >> ffsource/README
echo "" >> ffsource/README
