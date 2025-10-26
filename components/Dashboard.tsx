import React, { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { SimulationResult, ChartConfig } from '../types';
import ForecastChart from './ForecastChart';
import MetricsTable from './MetricsTable';
import ShapPlot from './ShapPlot';

interface DashboardProps {
  result: SimulationResult;
}

const chartConfigs: ChartConfig[] = [
    { key: 'globalPrice', scenarioKey: 'globalPriceScenario', name: 'Global Price (FCPO)', color: '#3b82f6', unit: ' USD/tonne' },
    { key: 'importVolume', scenarioKey: 'importVolumeScenario', name: 'Import Volume', color: '#10b981', unit: ' M Tonnes' },
    { key: 'domesticPrice', scenarioKey: 'domesticPriceScenario', name: 'Domestic Price Index', color: '#f59e0b', unit: '' },
    { key: 'farmerPriceIndex', scenarioKey: 'farmerPriceIndexScenario', name: 'Farmer Price Index', color: '#ef4444', unit: '' },
];

const Dashboard: React.FC<DashboardProps> = ({ result }) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        let yPos = 20;

        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(22);
        pdf.text('Policy Impact Report', pdfWidth / 2, yPos, { align: 'center' });
        yPos += 10;
        
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(16);
        pdf.text(`Scenario: ${result.scenarioName}`, pdfWidth / 2, yPos, { align: 'center' });
        yPos += 8;
        
        pdf.setFontSize(12);
        pdf.setTextColor(100);
        pdf.text(`Report Generated: ${new Date().toLocaleString()}`, pdfWidth / 2, yPos, { align: 'center' });
        yPos += 20;

        const metricsTableElement = document.getElementById('metrics-table-container');
        if (metricsTableElement) {
            const canvas = await html2canvas(metricsTableElement, { scale: 2, backgroundColor: '#ffffff' });
            const imgData = canvas.toDataURL('image/png');
            const imgProps = pdf.getImageProperties(imgData);
            const imgHeight = (imgProps.height * (pdfWidth - 20)) / imgProps.width;
            pdf.addImage(imgData, 'PNG', 10, yPos, pdfWidth - 20, imgHeight);
            yPos += imgHeight + 15;
        }

        pdf.addPage();
        yPos = 20;

        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(18);
        pdf.text('Forecast Charts', 10, yPos);
        yPos += 10;
        
        const chartElements = document.querySelectorAll('.forecast-chart-container');
        for (let i = 0; i < chartElements.length; i++) {
            const element = chartElements[i] as HTMLElement;
            const canvas = await html2canvas(element, { scale: 2, backgroundColor: '#ffffff' });
            const imgData = canvas.toDataURL('image/png');
            const imgProps = pdf.getImageProperties(imgData);
            const chartWidth = (pdfWidth / 2) - 15;
            const chartHeight = (imgProps.height * chartWidth) / imgProps.width;

            if (yPos + chartHeight > pdfHeight - 20) {
                pdf.addPage();
                yPos = 20;
            }

            const xPos = (i % 2 === 0) ? 10 : (pdfWidth / 2) + 5;
            pdf.addImage(imgData, 'PNG', xPos, yPos, chartWidth, chartHeight);

            if (i % 2 !== 0 || i === chartElements.length - 1) {
                yPos += chartHeight + 10;
            }
        }
        
        if (yPos > pdfHeight - 60) { pdf.addPage(); yPos = 20; } else { yPos += 10; }
        
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(18);
        pdf.text('Policy Recommendations', 10, yPos);
        yPos += 10;
        
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(11);
        pdf.setTextColor(0);
        const textLines = pdf.splitTextToSize(result.recommendations.replace(/(\* |- )/g, ''), pdfWidth - 20);
        
        textLines.forEach((line: string) => {
            if (yPos > pdfHeight - 15) { pdf.addPage(); yPos = 20; }
            pdf.text(`• ${line}`, 14, yPos);
            yPos += 7;
        });
        
        pdf.save(`PalmTariffSim-Report-${result.scenarioName.replace(/[^a-z0-9]/gi, '_')}.pdf`);
    } catch (e) {
        console.error("Error generating PDF:", e);
        alert("An error occurred while generating the PDF. Please check the console for details.");
    } finally {
        setIsExporting(false);
    }
  };

  return (
    <div className="mt-8 space-y-8">
      <div className="bg-white p-4 rounded-lg shadow-lg border border-slate-200 flex justify-between items-center">
        <div>
            <h2 className="text-xl font-bold text-slate-800">
            Simulation Report
            </h2>
            <p className="text-sm text-slate-500">
            Scenario: <span className="font-semibold text-blue-600">{result.scenarioName}</span>
            </p>
        </div>
        <button
          onClick={handleExportPDF}
          disabled={isExporting}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg inline-flex items-center transition duration-150 ease-in-out disabled:bg-green-400 disabled:cursor-not-allowed"
        >
          {isExporting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Exporting...
            </>
          ) : (
            <>
              <i className="fas fa-file-pdf mr-2"></i>
              Export Report
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-1">
          <MetricsTable metrics={result.metrics} />
        </div>
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-lg border border-slate-200">
          <h3 className="text-xl font-semibold text-slate-700 mb-4 flex items-center"><i className="fas fa-bullseye-pointer mr-3 text-slate-400"></i>Policy Recommendations</h3>
          <ul className="space-y-3 text-slate-600">
            {result.recommendations.split('\n').map((line, index) => {
              const trimmedLine = line.trim();
              if (trimmedLine.startsWith('* ') || trimmedLine.startsWith('- ')) {
                return <li key={index} className="flex items-start"><i className="fas fa-check-circle text-green-500 mr-3 mt-1"></i><span>{trimmedLine.substring(2)}</span></li>;
              }
              return null;
            })}
          </ul>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg border border-slate-200">
         <h3 className="text-xl font-semibold text-slate-700 mb-4 border-b pb-3"><i className="fas fa-chart-area mr-2 text-slate-400"></i>Economic Forecasts</h3>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {chartConfigs.map(config => (
                <div key={config.key}>
                    <h4 className="text-lg font-semibold text-slate-600 mb-2 text-center">{config.name}</h4>
                    <ForecastChart 
                        data={result.forecasts}
                        config={config}
                    />
                </div>
            ))}
        </div>
      </div>
      
      <ShapPlot summary={result.shapSummary} />
    </div>
  );
};

export default Dashboard;