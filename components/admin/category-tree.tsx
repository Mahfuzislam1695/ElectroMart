"use client"

import { useState } from "react"
import { ChevronRight, ChevronDown, Folder, FolderOpen } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Category {
  id: string
  name: string
  slug: string
  parent: string | null
  products: number
  status: string
  attributes: string[]
}

interface CategoryTreeProps {
  categories: Category[]
}

export function CategoryTree({ categories }: CategoryTreeProps) {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(["1", "4"]))

  const toggleNode = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes)
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId)
    } else {
      newExpanded.add(nodeId)
    }
    setExpandedNodes(newExpanded)
  }

  const getChildren = (parentName: string | null) => {
    return categories.filter((cat) => cat.parent === parentName)
  }

  const renderNode = (category: Category, level = 0) => {
    const children = getChildren(category.name)
    const hasChildren = children.length > 0
    const isExpanded = expandedNodes.has(category.id)

    return (
      <div key={category.id} className="select-none">
        <div
          className={`flex items-center space-x-2 py-2 px-2 rounded-md hover:bg-gray-50 cursor-pointer`}
          style={{ paddingLeft: `${level * 20 + 8}px` }}
          onClick={() => hasChildren && toggleNode(category.id)}
        >
          {hasChildren ? (
            isExpanded ? (
              <ChevronDown className="h-4 w-4 text-gray-500" />
            ) : (
              <ChevronRight className="h-4 w-4 text-gray-500" />
            )
          ) : (
            <div className="w-4" />
          )}

          {hasChildren ? (
            isExpanded ? (
              <FolderOpen className="h-4 w-4 text-blue-500" />
            ) : (
              <Folder className="h-4 w-4 text-blue-500" />
            )
          ) : (
            <Folder className="h-4 w-4 text-gray-400" />
          )}

          <span className="font-medium text-sm">{category.name}</span>
          <Badge variant="secondary" className="text-xs">
            {category.products}
          </Badge>
        </div>

        {hasChildren && isExpanded && <div>{children.map((child) => renderNode(child, level + 1))}</div>}
      </div>
    )
  }

  const rootCategories = getChildren(null)

  return <div className="space-y-1">{rootCategories.map((category) => renderNode(category))}</div>
}
