'use client'

import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

interface AllocationData {
  game: string
  value: number
  percentage: number
  color: string
}

interface AssetAllocationProps {
  data: AllocationData[]
}

const AssetAllocation = ({ data }: AssetAllocationProps) => {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white p-3 border border-periwinkle-200 rounded-lg shadow-lg">
          <p className="font-medium text-periwinkle-900">{data.game}</p>
          <p className="text-sm text-periwinkle-600">
             ({data.percentage}%)
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-4">
      {/* Pie Chart */}
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={cell-} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-periwinkle-700">{item.game}</span>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-periwinkle-900">
                {item.percentage}%
              </p>
              <p className="text-xs text-periwinkle-600">
                
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AssetAllocation
