# Card Swap Animation Flow Diagram

## Forward Navigation (Next Button / Right Arrow)

```
                   ╔═══════════════╗
                  ╱  EXITING CARD   ╲
                 ╱   (Upper Right)   ╲ ↗️ 
                ╱     8° tilt →      ╱  ↗️
               ╱  UP_RIGHT path     ╱    ↗️
              ╚═══════════════════╝      ↗️
              
         ╔═══════════════╗
        ║  FRONT CARD    ║  ← Becomes front
        ║  (Scaling up)  ║  
        ╚═══════════════╝
        
    ╔═══════════════╗
   ║  Card 3        ║  ← Shifts forward
   ║  (Moving up)   ║
   ╚═══════════════╝
   
╔═══════════════╗
║  Card 4        ║  ← Shifts forward
║  (Moving up)   ║
╚═══════════════╝
```

**Animation Details:**
- Exit Direction: `{ x: 0.75, y: -0.66 }` (upper-right)
- Tilt: `+8°` (right lean)
- Spring Damping: `0.92` (smooth, no overshoot)
- Duration: ~1.2s at speed 0.75

---

## Backward Navigation (Previous Button / Left Arrow)

```
    ╔═══════════════╗
   ╱  EXITING CARD   ╲
  ╱   (Upper Left)    ╲ ↖️
 ╱     ← 8° tilt      ╱  ↖️
╱   UP_LEFT path     ╱    ↖️
╚═══════════════════╝      ↖️
              
         ╔═══════════════╗
        ║  NEW FRONT     ║  ← Comes from back
        ║  (Scaling up)  ║  
        ╚═══════════════╝
        
    ╔═══════════════╗
   ║  Card 2        ║  ← Shifts back
   ║  (Moving down) ║
   ╚═══════════════╝
   
╔═══════════════╗
║  Card 3        ║  ← Shifts back
║  (Moving down) ║
╚═══════════════╝
```

**Animation Details:**
- Exit Direction: `{ x: -0.75, y: -0.66 }` (upper-left)
- Tilt: `-8°` (left lean)
- Spring Damping: `0.92` (smooth, no overshoot)
- Duration: ~1.2s at speed 0.75

---

## Key Characteristics

### ✅ Smooth Continuous Motion
- No intermediate downward movement
- Direct path from start to end
- Coordinated X, Y, Z translation

### ✅ Natural Physics
- Spring-based animation (not linear)
- High damping prevents bouncing
- Realistic card weight feel

### ✅ 3D Perspective Maintained
- Cards stay in 3D space throughout
- Depth (Z-axis) changes smoothly
- Proper layering and occlusion

### ✅ Perfect Symmetry
- Left and right animations are mirrors
- Same timing and easing
- Consistent feel in both directions

### ✅ Premium Details
- Automatic rotation based on direction
- Smooth opacity transitions
- Depth-based shadow dimming
- Hover state with spread effect

---

## Technical Parameters

| Property | Value | Purpose |
|----------|-------|---------|
| `UP_RIGHT` | `{ x: 0.75, y: -0.66 }` | Forward exit direction |
| `UP_LEFT` | `{ x: -0.75, y: -0.66 }` | Backward exit direction |
| Exit Omega | `TAU * 1.65 * 0.75` | Exit animation frequency |
| Exit Zeta | `0.92` | Exit damping (high = smooth) |
| Rest Omega | `TAU * 1.5 * 0.75` | Rest animation frequency |
| Rest Zeta | `0.88` | Rest damping |
| Auto Tilt | `dir.x * 8°` | Rotation based on direction |
| Card Size | `400 x 520 px` | Increased from 350x460 |
| Visible Cards | `4` | Cards in stack |
| Card Spacing | `58px horizontal, 48px vertical` | Stack depth |

---

## Before vs After

### ❌ Before (Old Animation)
- Card moved **downward** first
- Then repositioned awkwardly
- Sudden jumps and direction changes
- Linear easing felt mechanical
- No directional difference

### ✅ After (New Animation)
- Card moves **upward-diagonal** immediately
- Smooth continuous path
- Natural rotation and tilt
- Premium spring physics
- Mirror animations for left/right

---

## User Experience

**Forward (Next):**
"The card gracefully lifts up and glides to the upper-right with a subtle lean, 
like dealing a premium card from a luxury deck."

**Backward (Previous):**
"The card elegantly rises and sweeps to the upper-left with opposite rotation,
maintaining the same premium feel in reverse."

Both directions feel **intentional, smooth, and luxurious** - exactly what you'd 
expect from a high-end fashion brand's website.
