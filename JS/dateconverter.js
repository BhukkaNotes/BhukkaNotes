   // Nepali calendar data from 2000 BS to 2090 BS
    // Each array contains the days in each month of that year
    const nepaliMonthData = {
        2000: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
        2001: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        2002: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
        2003: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
        2004: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
        2005: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        2006: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
        2007: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
        2008: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],
        2009: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        2010: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
        2011: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
        2012: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
        2013: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        2014: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
        2015: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
        2016: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
        2017: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        2018: [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
        2019: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
        2020: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
        2021: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        2022: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
        2023: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
        2024: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
        2025: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        2026: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
        2027: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
        2028: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        2029: [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
        2030: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
        2031: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
        2032: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        2033: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
        2034: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
        2035: [30, 32, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],
        2036: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        2037: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
        2038: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
        2039: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
        2040: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        2041: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
        2042: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
        2043: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
        2044: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        2045: [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
        2046: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
        2047: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
        2048: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        2049: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
        2050: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
        2051: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
        2052: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        2053: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
        2054: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
        2055: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        2056: [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
        2057: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
        2058: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
        2059: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        2060: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
        2061: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
        2062: [30, 32, 31, 32, 31, 31, 29, 30, 29, 30, 29, 31],
        2063: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        2064: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
        2065: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
        2066: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],
        2067: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        2068: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
        2069: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
        2070: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
        2071: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        2072: [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
        2073: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
        2074: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
        2075: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        2076: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
        2077: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
        2078: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
        2079: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        2080: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
        2081: [31, 31, 32, 32, 31, 30, 30, 30, 29, 30, 30, 30],
        2082: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
        2083: [31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30],
        2084: [31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30],
        2085: [31, 32, 31, 32, 30, 31, 30, 30, 29, 30, 30, 30],
        2086: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
        2087: [31, 31, 32, 31, 31, 31, 30, 30, 29, 30, 30, 30],
        2088: [30, 31, 32, 32, 30, 31, 30, 30, 29, 30, 30, 30],
        2089: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
        2090: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30]
      };
  
      // Month names
      const nepaliMonthNames = [
        "Baisakh", "Jestha", "Asar", "Shrawan", "Bhadra", "Ashwin",
        "Kartik", "Mangsir", "Poush", "Magh", "Falgun", "Chaitra"
      ];
      
      const englishMonthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
  
      // Reference date (for calculation)
      // 2000-01-01 BS corresponds to 1943-04-14 AD
      const referenceBS = { year: 2000, month: 1, day: 1 };
      const referenceAD = new Date(1943, 3, 14); // Months are 0-indexed in JavaScript Date
  
      // Convert BS to AD
      document.getElementById('convert-to-ad').addEventListener('click', function() {
        const bsYear = parseInt(document.getElementById('bs-year').value);
        const bsMonth = parseInt(document.getElementById('bs-month').value);
        const bsDay = parseInt(document.getElementById('bs-day').value);
        const resultElement = document.getElementById('ad-result');
        const errorElement = document.getElementById('bs-error');
        
        // Validate input
        errorElement.textContent = '';
        if (!bsYear || bsYear < 2000 || bsYear > 2090) {
          errorElement.textContent = 'Year must be between 2000 and 2090 BS';
          return;
        }
        
        if (!bsMonth || bsMonth < 1 || bsMonth > 12) {
          errorElement.textContent = 'Month must be between 1 and 12';
          return;
        }
        
        if (!bsDay || bsDay < 1) {
          errorElement.textContent = 'Day must be at least 1';
          return;
        }
        
        // Check if day exceeds the maximum for the given month and year
        if (!nepaliMonthData[bsYear] || bsDay > nepaliMonthData[bsYear][bsMonth - 1]) {
          errorElement.textContent = `Invalid day for ${nepaliMonthNames[bsMonth - 1]}, ${bsYear} BS`;
          return;
        }
        
        // Calculate days since reference date
        let totalDays = 0;
        
        // Add days from years
        for (let y = referenceBS.year; y < bsYear; y++) {
          if (nepaliMonthData[y]) {
            nepaliMonthData[y].forEach(days => {
              totalDays += days;
            });
          }
        }
        
        // Add days from months of the current year
        for (let m = 0; m < bsMonth - 1; m++) {
          if (nepaliMonthData[bsYear]) {
            totalDays += nepaliMonthData[bsYear][m];
          }
        }
        
        // Add days of the current month
        totalDays += (bsDay - 1);
        
        // Calculate AD date by adding days to reference date
        const adDate = new Date(referenceAD);
        adDate.setDate(adDate.getDate() + totalDays);
        
        const adYear = adDate.getFullYear();
        const adMonth = adDate.getMonth();
        const adDay = adDate.getDate();
        
        // Format result
        const adMonthName = englishMonthNames[adMonth];
        resultElement.textContent = `${adDay} ${adMonthName}, ${adYear} AD`;
      });
  
      // Convert AD to BS
      document.getElementById('convert-to-bs').addEventListener('click', function() {
        const adYear = parseInt(document.getElementById('ad-year').value);
        const adMonth = parseInt(document.getElementById('ad-month').value);
        const adDay = parseInt(document.getElementById('ad-day').value);
        const resultElement = document.getElementById('bs-result');
        const errorElement = document.getElementById('ad-error');
        
        // Validate input
        errorElement.textContent = '';
        if (!adYear || adYear < 1944 || adYear > 2033) {
          errorElement.textContent = 'Year must be between 1944 and 2033 AD';
          return;
        }
        
        if (adMonth === undefined || adMonth < 0 || adMonth > 11) {
          errorElement.textContent = 'Please select a valid month';
          return;
        }
        
        if (!adDay || adDay < 1 || adDay > 31) {
          errorElement.textContent = 'Day must be between 1 and 31';
          return;
        }
        
        // Check if the date is valid
        const adDate = new Date(adYear, adMonth, adDay);
        if (adDate.getDate() !== adDay) {
          errorElement.textContent = 'Invalid date for the selected month';
          return;
        }
        
        // Calculate days since reference date
        const timeDiff = adDate.getTime() - referenceAD.getTime();
        const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
        
        // Calculate BS date
        let bsYear = referenceBS.year;
        let bsMonth = referenceBS.month;
        let bsDay = referenceBS.day+1; //this is a fix my Jesis so not good but works
        let remainingDays = daysDiff;
        
        // Calculate year and month
        while (remainingDays > 0) {
          // Check if we need to move to next year
          if (bsMonth > 12) {
            bsYear++;
            bsMonth = 1;
          }
          
          // Days in current month
          const daysInMonth = nepaliMonthData[bsYear] ? nepaliMonthData[bsYear][bsMonth - 1] : 30;
          
          // If remaining days are less than days in month, add them to day
          if (remainingDays < daysInMonth) {
            bsDay += remainingDays;
            remainingDays = 0;
          } else {
            // Move to next month
            remainingDays -= daysInMonth;
            bsMonth++;
          }
          
          // If day exceeds days in month, adjust month and day
          if (nepaliMonthData[bsYear] && bsDay > nepaliMonthData[bsYear][bsMonth - 1]) {
            bsDay = bsDay - nepaliMonthData[bsYear][bsMonth - 1];
            bsMonth++;
          }
        }
        
        // Format result
        const bsMonthName = nepaliMonthNames[bsMonth - 1];
        resultElement.textContent = `${bsDay} ${bsMonthName}, ${bsYear} BS`;
      });
  
      // Set current date values
      window.addEventListener('DOMContentLoaded', function() {
        const today = new Date();
        document.getElementById('ad-year').value = today.getFullYear();
        document.getElementById('ad-month').value = today.getMonth();
        document.getElementById('ad-day').value = today.getDate();
        document.getElementById('bs-year').value = 2080; // Default BS year
      });