if '%errorlevel%' neq '0' exit /b %errorlevel%

git rev-parse --short refs/heads/master > tmp.$$$
set /p revision= < tmp.$$$

date /T > tmp.$$$
set /p dstamp= < tmp.$$$
time /T > tmp.$$$
set /p tstamp= < tmp.$$$

echo %dstamp:~10,4%%dstamp:~7,2%%dstamp:~4,2%%tstamp:~0,2%%tstamp:~3,2% > tmp.$$$
set /p tagval= < tmp.$$$

git tag %tagval% -a -m released
git push origin %tagval%
if '%errorlevel%' neq '0' exit /b %errorlevel%

git describe > tmp.$$$
set /p revisionTag= < tmp.$$$

:: docker build -t aemo .
if '%errorlevel%' neq '0' exit /b %errorlevel%
