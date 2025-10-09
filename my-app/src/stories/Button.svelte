<script lang="ts">
  interface Props {
    primary?: boolean;
    backgroundColor?: string;
    size?: 'small' | 'medium' | 'large';
    label: string;
    onclick?: () => void;
  }

  const { primary = false, backgroundColor, size = 'medium', label, ...props }: Props = $props();

  let sizeClass = $derived(size === 'small' ? 'px-3 py-1 text-sm' : size === 'large' ? 'px-5 py-3 text-base' : 'px-4 py-2 text-sm');
  let bg = $derived(primary ? 'bg-black text-white hover:bg-black/90' : 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50');
  let style = $derived(backgroundColor ? `background-color: ${backgroundColor}` : '');
</script>

<button
  type="button"
  class={`inline-flex items-center rounded ${sizeClass} font-medium transition ${bg}`}
  {style}
  {...props}
>
  {label}
</button>
