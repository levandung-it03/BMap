'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'

interface PostModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (content: string) => void
}

export function PostModal({ isOpen, onClose, onSubmit }: PostModalProps) {
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async () => {
    if (!content.trim()) return

    setIsSubmitting(true)

    // Show moderation toast
    toast({
      title: 'Moderating by AI...',
      description: 'Your post is being reviewed by our AI moderation system.',
      duration: 2000,
    })

    // Simulate moderation delay
    setTimeout(() => {
      onSubmit(content)
      setContent('')
      setIsSubmitting(false)
      onClose()

      // Success toast
      toast({
        title: 'Success!',
        description: 'Your post has been published.',
        duration: 2000,
      })
    }, 1500)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share with the Community</DialogTitle>
          <DialogDescription>
            Post anonymously to discuss anything university-related
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <Textarea
            placeholder="What's on your mind? Ask a question, share advice, or confess something..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-24 resize-none"
          />

          <div className="bg-muted/50 rounded-lg p-3 text-xs text-muted-foreground">
            <p className="font-medium mb-1">Posting anonymously</p>
            <p>Your identity is protected. All posts go through AI moderation.</p>
          </div>

          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!content.trim() || isSubmitting}
              className="bg-primary hover:bg-primary/90"
            >
              {isSubmitting ? 'Posting...' : 'Post'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
